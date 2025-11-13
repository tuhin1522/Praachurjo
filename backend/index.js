import { connection } from "./connect_db.js";
import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();
const con = connection();

app.use(cors({
    origin: "http://localhost:5173", // your React frontend
    credentials: true                 // allow cookies
}));
app.use(express.json());
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000, sameSite: "lax", secure: false,httpOnly: true } // 1 day
}));

app.get("/", (req, res) => {
    res.json({user: req.session.user});
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.send('Error destroying session');
        } else {
            res.send('Session destroyed');
        }
    });
});

app.post("/customers/signup", (req, res) => {
    const { fname, username, email, password, phone, address } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }
    const sql = "INSERT INTO customers (full_name, username, address, phone_number, email, password) VALUES (?, ?, ?, ?, ?, ?)";
    con.query(sql, [fname, username, address, phone, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User added successfully", id: result.insertId });
    });
});

app.post("/customers/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const sql = "SELECT username FROM customers WHERE email = ? AND password = ?";
    con.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0){
            return res.status(401).json({ error: "Invalid email or password" });
        }
        req.session.user = results[0].username;
        res.json({ message: "Login successful", user: req.session.user });
    });
});

app.post("/admin/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0){
            return res.status(401).json({ error: "Invalid email or password" });
        }
        req.session.username = results[0].username;
        res.json({ message: "Login successful", user: req.session.username });
    });
});

app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";
    con.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json( results);
    });
});

app.get("/products/:id",(req,res) => {
    const id = parseInt(req.params.id);
    const sql = "SELECT * FROM products WHERE id = ?";
    con.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0){
            return res.status(401).json({ error: "No Products Found" });
        }
        console.log(id)
        res.json(results);
    });
})
app.get("/products/:id/seller",(req,res) => {
    const id = parseInt(req.params.id);
    const sql = `select * from products INNER JOIN stores ON products.id=${id} AND products.store_id=stores.store_id;`;
    con.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0){
            return res.status(401).json({ error: "No Products Found" });
        }
        console.log(id)
        res.json(results);
    });
})

app.get("/sellers",(req,res) => {
    const id = parseInt(req.params.id);
    const sql = `SELECT name,store_name,email,phone from sellers INNER JOIN stores where sellers.seller_id=stores.seller_id;`;
    con.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0){
            return res.status(401).json({ error: "No Products Found" });
        }
        console.log(id)
        res.json(results);
    });
})

app.get("/reviews/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `
        SELECT id, product_id, reviewer, review_description, 
               number_of_star, date, sentiment, confidence, 
               sentiment_color, text_color
        FROM reviews 
        WHERE product_id = ?
        ORDER BY date DESC
    `;
    con.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length === 0) {
            return res.json({ 
                success: true,
                message: "No reviews found", 
                reviews: [],
                stats: {
                    total: 0,
                    positive: 0,
                    negative: 0,
                    overallRating: 0,
                    percentage: 0
                }
            });
        }
        
        // Calculate overall statistics
        const positive = results.filter(r => r.sentiment === 'positive').length;
        const negative = results.filter(r => r.sentiment === 'negative').length;
        const total = results.length;
        const percentage = total > 0 ? (positive / total) * 100 : 0;
        
        // Convert percentage to 1-5 rating scale
        const overallRating = Math.round((percentage / 100) * 5 * 10) / 10; // Round to 1 decimal
        
        res.json({
            success: true,
            message: `Found ${total} reviews`,
            reviews: results,
            stats: {
                total: total,
                positive: positive,
                negative: negative,
                overallRating: overallRating,
                percentage: Math.round(percentage)
            }
        });
    });
});

app.post("/update", (req, res) => {
    const { status ,id } = req.body;

    const sql = "UPDATE cart SET status = ? WHERE id = ?";
    con.query(sql, [status, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json( {message: "Status Updated Successfully"});
    });
});

app.get("/carts", (req, res) => {
    const sql = "SELECT * FROM cart";
    con.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json( results);
    });
});

app.get("/products/category/:id",(req,res) => {
    const category = req.params.id;
    const sql = "SELECT * FROM products WHERE category = ?";
    con.query(sql, [category], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0){
            return res.status(401).json({ error: "No Products Found" });
        }
        console.log(category)
        res.json(results);
    });
})

app.get("/search/:srch",(req,res) => {
    const srch = req.params.srch;
    const sql = `SELECT * FROM products WHERE INSTR(title, '${srch}') > 0;`;
    con.query(sql, [srch], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0){
            return res.status(401).json({ error: "No Products Found" });
        }
        res.json(results);
    });
})

app.get("/:user/track",(req,res) => {
    const user = req.params.user;
    const sql = "SELECT * FROM cart WHERE username = ?";
    con.query(sql, [user], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0){
            return res.status(401).json({ error: "No Products Found" });
        }
        res.json(results);
    });
})

app.post("/review/:id/add", async (req, res) => {
    const productId = parseInt(req.params.id);
    const { user, star, review, date } = req.body;
    if (!user || !star || !review || !date) {
        return res.status(400).json({ error: "User, star, review, and date are required" });
    }

    try {
        // Call sentiment analysis API
        const sentimentResponse = await fetch("http://localhost:8000/api/analyze-sentiment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: review })
        });

        let sentimentData = {
            sentiment: 'positive',
            confidence: 50.0,
            color: '#10b981',
            text_color: 'text-green-600'
        };

        if (sentimentResponse.ok) {
            const sentimentResult = await sentimentResponse.json();
            if (sentimentResult.success) {
                sentimentData = sentimentResult.analysis;
            }
        } else {
            console.warn("Sentiment analysis failed, using default positive sentiment");
        }

        // Insert review with sentiment data
        const sql = `INSERT INTO reviews 
                     (product_id, reviewer, number_of_star, review_description, date, 
                      sentiment, confidence, sentiment_color, text_color) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        con.query(sql, [
            productId, 
            user, 
            star, 
            review, 
            date,
            sentimentData.sentiment,
            sentimentData.confidence,
            sentimentData.color,
            sentimentData.text_color
        ], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ 
                message: "Review added successfully with sentiment analysis",
                sentiment: sentimentData
            });
        });

    } catch (error) {
        console.error("Error in review processing:", error);
        // Fallback: insert review without sentiment analysis
        const sql = "INSERT INTO reviews (product_id, reviewer, number_of_star, review_description, date) VALUES (?, ?, ?, ?, ?)";
        con.query(sql, [productId, user, star, review, date], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Review added successfully (without sentiment analysis)" });
        });
    }
});

app.get("/reviews/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `
        SELECT id, product_id, reviewer, review_description, 
               number_of_star, date, sentiment, confidence, 
               sentiment_color, text_color
        FROM reviews 
        WHERE product_id = ?
        ORDER BY date DESC
    `;
    con.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length === 0) {
            return res.json({ 
                success: true,
                message: "No reviews found", 
                reviews: [],
                stats: {
                    total: 0,
                    positive: 0,
                    negative: 0,
                    overallRating: 0,
                    percentage: 0
                }
            });
        }
        
        // Calculate overall statistics
        const positive = results.filter(r => r.sentiment === 'positive').length;
        const negative = results.filter(r => r.sentiment === 'negative').length;
        const total = results.length;
        const percentage = total > 0 ? (positive / total) * 100 : 0;
        const overallRating = Math.round((percentage / 100) * 5 * 10) / 10;
        
        res.json({
            success: true,
            message: `Found ${total} reviews`,
            reviews: results,
            stats: {
                total: total,
                positive: positive,
                negative: negative,
                overallRating: overallRating,
                percentage: Math.round(percentage)
            }
        });
    });
});

app.post("/cart/add", (req, res) => {
    const { user, cart, cartCounts } = req.body;
    console.log(cart);
    if (!user || !cart || !cartCounts) {
        return res.status(400).json({ error: "User, cart, and cartCounts are required" });
    }
    const sql = "INSERT INTO cart (username, product_id, quantity, status, Address, payment_method, sender_number,transaction_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    cart.forEach((item, index) => {
        if(cartCounts[index]===0) return;
        con.query(sql, [user, item.id, cartCounts[index], "Pending", req.body.address, req.body.paymentMethod, req.body.senderNumber, req.body.transactionId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
        });
    });
    res.json({ message: "User added successfully"});
});

app.listen(5000, () => {
    console.log('REST API server running on port 5000');
});
