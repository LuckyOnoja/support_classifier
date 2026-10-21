const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./support.sqlite');

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS tickets");
    db.run(`CREATE TABLE tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_code TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        issue_desc TEXT NOT NULL,
        priority TEXT NOT NULL,
        status TEXT NOT NULL
    )`);

    const stmt = db.prepare("INSERT INTO tickets (ticket_code, customer_name, issue_desc, priority, status) VALUES (?, ?, ?, ?, ?)");
    const mockTickets = [
        ["TICK-101", "Alice Smith", "App crashes immediately on login", "UNASSIGNED", "PENDING"],
        ["TICK-102", "Bob Jones", "Password reset link not working", "UNASSIGNED", "PENDING"],
        ["TICK-103", "Charlie Brown", "Billing error on latest invoice", "UNASSIGNED", "PENDING"],
        ["TICK-104", "Diana Prince", "Feature request for dark mode", "UNASSIGNED", "PENDING"],
        ["TICK-105", "Evan Wright", "System out of memory error on server", "UNASSIGNED", "PENDING"],
        ["TICK-106", "Fiona Gallagher", "Cannot update profile picture", "UNASSIGNED", "PENDING"],
        ["TICK-107", "George Martin", "Security vulnerability suspected", "UNASSIGNED", "PENDING"],
        ["TICK-108", "Hannah Abbott", "Slow loading times on dashboard", "UNASSIGNED", "PENDING"],
        ["TICK-109", "Ian Malcolm", "Database connection timeout", "UNASSIGNED", "PENDING"],
        ["TICK-110", "Julia Roberts", "Typo on the landing page footer", "UNASSIGNED", "PENDING"]
    ];
    
    mockTickets.forEach(t => stmt.run(t));
    stmt.finalize();
    console.log("Support database initialized with 10 pending tickets.");
});

db.close();