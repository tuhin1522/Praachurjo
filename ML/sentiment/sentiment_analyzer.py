import pickle
import os
import re
from pathlib import Path
from textblob import TextBlob
import nltk
import spacy

# Download required NLTK data
nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)
nltk.download('stopwords', quiet=True)

from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

# Initialize Stemmer and spaCy
stemmer = PorterStemmer()
try:
    nlp = spacy.load('en_core_web_sm')
except:
    print("⚠️ spaCy model not found. Installing...")
    os.system('python -m spacy download en_core_web_sm')
    nlp = spacy.load('en_core_web_sm')

# Chat words dictionary
chat_words = {
    "u": "you",
    "r": "are",
    "ur": "your",
    "gr8": "great",
    "b4": "before",
    "pls": "please",
    "thx": "thanks",
    "luv": "love",
    "btw": "by the way",
    "omg": "oh my god",
    "idk": "i don't know",
    "lol": "laughing out loud",
    "np": "no problem",
    "msg": "message",
    "w/": "with",
    "w/o": "without",
    "b/c": "because",
}

class SentimentAnalyzer:
    def __init__(self, model_path='sentiment_model.pkl', vectorizer_path='tfidf_vectorizer.pkl'):
        """Initialize the sentiment analyzer with trained model and vectorizer"""
        self.model_path = Path(__file__).parent / model_path
        self.vectorizer_path = Path(__file__).parent / vectorizer_path
        self.model = None
        self.vectorizer = None
        self.stopwords = set(stopwords.words('english'))
        self.load_model_and_vectorizer()
    
    def load_model_and_vectorizer(self):
        """Load the pre-trained sentiment model and TF-IDF vectorizer"""
        try:
            # Load the sentiment model
            if os.path.exists(self.model_path):
                with open(self.model_path, 'rb') as f:
                    model_data = pickle.load(f)
                    
                    # Handle different pickle formats for model
                    if isinstance(model_data, dict):
                        self.model = model_data.get('model')
                    else:
                        self.model = model_data
                    
                    if self.model is None:
                        raise ValueError("Failed to load model")
                    
                    print("✅ Sentiment model loaded successfully")
                    print(f"   Model type: {type(self.model).__name__}")
            else:
                raise FileNotFoundError(f"Model file not found at {self.model_path}")
            
            # Load the TF-IDF vectorizer
            if os.path.exists(self.vectorizer_path):
                with open(self.vectorizer_path, 'rb') as f:
                    vectorizer_data = pickle.load(f)
                    
                    # Handle different pickle formats for vectorizer
                    if isinstance(vectorizer_data, dict):
                        self.vectorizer = vectorizer_data.get('vectorizer')
                    else:
                        self.vectorizer = vectorizer_data
                    
                    if self.vectorizer is None:
                        raise ValueError("Failed to load vectorizer")
                    
                    print("✅ TF-IDF vectorizer loaded successfully")
                    print(f"   Vectorizer type: {type(self.vectorizer).__name__}")
                    print(f"   Vocabulary size: {len(self.vectorizer.vocabulary_)}")
            else:
                raise FileNotFoundError(f"Vectorizer file not found at {self.vectorizer_path}")
            
        except Exception as e:
            print(f"❌ Error loading sentiment model or vectorizer: {e}")
            print(f"   Model path: {self.model_path}")
            print(f"   Vectorizer path: {self.vectorizer_path}")
            raise
    
    def clean_text(self, text):
        """Clean text by removing URLs, HTML tags, punctuation, etc."""
        text = text.lower()
        text = re.sub(r'\[.*?\]', '', text)  # Remove content inside square brackets
        text = re.sub(r'https?://\S+|www\.\S+', '', text)  # Remove URLs
        text = re.sub(r'<.*?>+', '', text)  # Remove HTML tags
        text = re.sub(r'[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), '', text)  # Remove punctuation
        text = re.sub(r'\n', '', text)  # Remove newlines
        text = re.sub(r'\w*\d\w*', '', text)  # Remove words with digits
        text = ' '.join([chat_words.get(word, word) for word in text.split()])  # Replace chat words
        return text

    def correct_spelling(self, text):
        """Correct spelling using TextBlob"""
        try:
            return str(TextBlob(text).correct())
        except:
            return text

    def remove_stopwords(self, text):
        """Remove English stopwords from text"""
        words = text.split()
        filtered_words = [word for word in words if word not in self.stopwords]
        return " ".join(filtered_words)
    
    def spacy_tokenize(self, text):
        """Tokenize text using spaCy"""
        doc = nlp(str(text))
        return [token.text for token in doc]

    def stem_words(self, tokens):
        """Apply Porter Stemming to tokens"""
        return [stemmer.stem(word) for word in tokens]

    def analyze_sentiment(self, text):
        """
        Analyze sentiment of review text using TF-IDF vectorizer
        Returns: dict with sentiment, confidence, rating, and color (NO NEUTRAL)
        """
        if not text or not isinstance(text, str):
            return {
                'sentiment': 'positive',
                'confidence': 50.0,
                'rating': 3,
                'color': '#10b981',
                'text_color': 'text-green-600'
            }
        
        try:
            # Text preprocessing pipeline
            text_lower = text.lower().strip()
            processed_text = self.clean_text(text_lower)
            processed_text = self.correct_spelling(processed_text)
            processed_text = self.remove_stopwords(processed_text)
            tokens = self.spacy_tokenize(processed_text)
            stemmed = self.stem_words(tokens)
            final_text = ' '.join(stemmed)
            
            # If text is empty after preprocessing, return neutral
            if not final_text.strip():
                return {
                    'sentiment': 'positive',
                    'confidence': 50.0,
                    'rating': 3,
                    'color': '#10b981',
                    'text_color': 'text-green-600'
                }
            
            # Vectorize and predict
            text_tfidf = self.vectorizer.transform([final_text])
            prediction = self.model.predict(text_tfidf)[0]
            probabilities = self.model.predict_proba(text_tfidf)[0]
            confidence = probabilities[prediction] * 100
            
            # Determine sentiment, rating, and color
            if prediction == 1:  # Positive
                sentiment = 'positive'
                color = '#10b981'  # Green
                text_color = 'text-green-600'
                # Rating based on confidence
                if confidence >= 90:
                    rating = 5
                elif confidence >= 80:
                    rating = 4
                else:
                    rating = 4
            else:  # Negative (prediction == 0)
                sentiment = 'negative'
                color = '#ef4444'  # Red
                text_color = 'text-red-600'
                # Rating based on confidence
                if confidence >= 90:
                    rating = 1
                elif confidence >= 80:
                    rating = 2
                else:
                    rating = 2
            
            result = {
                'sentiment': sentiment,
                'confidence': round(confidence, 2),
                'rating': rating,
                'color': color,
                'text_color': text_color,
            }
            
            # Add probability scores if available
            try:
                result['positive_score'] = round(probabilities[1] * 100, 2)
                result['negative_score'] = round(probabilities[0] * 100, 2)
            except:
                pass
            
            return result
        
        except Exception as e:
            print(f"❌ Error in sentiment analysis: {e}")
            import traceback
            traceback.print_exc()
            # Return POSITIVE as default on error
            return {
                'sentiment': 'positive',
                'confidence': 50.0,
                'rating': 3,
                'color': '#10b981',
                'text_color': 'text-green-600',
                'error': str(e)
            }