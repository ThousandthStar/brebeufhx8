import { jsPDF } from "jspdf";

function createPDF(subject, grade, date, type, concepts) {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    doc.setFont("courier", "bold");
    doc.setFontSize(16);
    const title = `StudBud AI study guide on ${subject}, grade ${grade}, ${type} on ${date}`
    const maxWidth = 170;
    const lines = doc.splitTextToSize(title, maxWidth);
    doc.text(lines, 20, 20);
    doc.setFontSize(12);
    let y = 50
    doc.text("Key Concepts", 20, 40)
    doc.setFont("courier", "normal");
    for (const concept of JSON.parse(concepts)) {
        const lines = doc.splitTextToSize(concept.replaceAll("\n", ""), maxWidth);
        doc.text(lines, 20, y);
        y += 10;
    }

    // Optionally, add more content (images, shapes, etc.)
    // doc.addImage(imgData, 'JPEG', x, y, width, height);

    // Trigger the download with the filename "document.pdf"
    doc.save("document.pdf");
}

createPDF("logarithms", 11, "13 March 2025", "test", `['Logarithms are the inverse operations of exponentiation and have several important properties that make calculations easier. Here are the key properties of logarithms\n' +
    '\n' +
    '1. **Product Property** The logarithm of a product is the sum of the logarithms. This means that for any positive numbers $a$ and $b$, $\\log_b(ab) = \\log_b(a) + \\log_b(b)$.\n' +
    '\n' +
    '2. **Quotient Property** The logarithm of a quotient is the difference of the logarithms. For any positive numbers $a$ and $b$, $\\log_b\\left(\\frac{a}{b}\\right) = \\log_b(a) - \\log_b(b)$.\n' +
    '\n' +
    '3. **Power Property** The logarithm of a number raised to an exponent is the exponent times the logarithm of the number. For any positive number $a$ and any real number $n$, $\\log_b(a^n) = n \\cdot \\log_b(a)$.\n' +
    '\n' +
    '4. **Change of Base Formula** You can change the base of a logarithm using the formula $\\log_b(a) = \\frac{\\log_k(a)}{\\log_k(b)}$, where $k$ is any positive number.\n' +
    '\n' +
    'Example Problem Simplify $\\log_2(8) + \\log_2(4)$.\n' +
    '\n' +
    'Solution: Using the Product Property, we can combine the logarithms\n' +
    '$\\log_2(8) + \\log_2(4) = \\log_2(8 \\cdot 4) = \\log_2(32)$.\n' +
    '\n' +
    'Now, since $32 = 2^5$, we have $\\log_2(32) = 5$. \n' +
    '\n' +
    'So, $\\log_2(8) + \\log_2(4) = 5$.']`);