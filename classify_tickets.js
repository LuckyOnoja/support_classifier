const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./support.sqlite');

db.serialize(() => {
    db.all("SELECT * FROM tickets", [], (err, rows) => {
        if (err) throw err;
        
        console.log("--- TICKET CLASSIFICATION AUDIT ---");
        
        rows.forEach(row => {
            let priority = "LOW";
            let status = "OPEN";
            let desc = row.issue_desc.toLowerCase();

            if (desc.includes("crash") || desc.includes("security") || desc.includes("memory") || desc.includes("timeout")) {
                priority = "HIGH";
                status = "ESCALATED";
            } else if (desc.includes("billing") || desc.includes("password")) {
                priority = "MEDIUM";
                status = "IN_PROGRESS";
            }

            db.run("UPDATE tickets SET priority = ?, status = ? WHERE id = ?", [priority, status, row.id]);

            console.log(`[${row.ticket_code}] ${row.customer_name} | Priority: ${priority} | Status: ${status}`);
        });
    });
});

setTimeout(() => {
    db.close();
    console.log("Ticket database successfully updated.");
}, 1000);