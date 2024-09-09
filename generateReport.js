const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } = require("docx");
const fs = require("fs");

function generateDepartmentReport(universityName, collegeName, departmentName, publications) {
    const doc = new Document();

    // Add the title to the document
    doc.addSection({
        children: [
            new Paragraph({
                text: `${universityName} - ${collegeName}`,
                heading: "Heading1",
                alignment: "center",
            }),
            new Paragraph({
                text: `Department of ${departmentName}`,
                heading: "Heading2",
                alignment: "center",
            }),
            new Paragraph({
                text: `Publication Report`,
                heading: "Heading3",
                alignment: "center",
            }),
            new Paragraph({ text: "" }), // Empty line for spacing
        ],
    });

    // Function to create a table for the report
    function createTable(title, headers, data) {
        const rows = [];

        // Add the headers
        rows.push(
            new TableRow({
                children: headers.map(header => 
                    new TableCell({
                        children: [new Paragraph(header)],
                        width: { size: 25, type: WidthType.PERCENTAGE },
                    })
                ),
            })
        );

        // Add the data rows
        data.forEach((item, index) => {
            const cells = item.map((cell) =>
                new TableCell({
                    children: [new Paragraph(cell)],
                    width: { size: 25, type: WidthType.PERCENTAGE },
                })
            );
            rows.push(new TableRow({ children: cells }));
        });

        return new Table({ rows });
    }

    // Add tables for each publication type
    if (publications.journals.length > 0) {
        doc.addSection({
            children: [
                new Paragraph({ text: "Journals Published", heading: "Heading4" }),
                createTable(
                    "Journals",
                    ["S/N", "Title", "Authors", "Year", "Staff Name"],
                    publications.journals.map((journal, index) => [
                        (index + 1).toString(),
                        journal.title,
                        journal.authors.join(", "),
                        journal.year.toString(),
                        journal.staffName,
                    ])
                ),
            ],
        });
    }

    if (publications.bookTitles.length > 0) {
        doc.addSection({
            children: [
                new Paragraph({ text: "Book Titles Produced", heading: "Heading4" }),
                createTable(
                    "Book Titles",
                    ["S/N", "Title", "Authors", "Organization", "Year", "Staff Name"],
                    publications.bookTitles.map((book, index) => [
                        (index + 1).toString(),
                        book.title,
                        book.authors.join(", "),
                        book.organization,
                        book.year.toString(),
                        book.staffName,
                    ])
                ),
            ],
        });
    }

    if (publications.nanTitles.length > 0) {
        doc.addSection({
            children: [
                new Paragraph({ text: "NaN Publications", heading: "Heading4" }),
                createTable(
                    "NaN Publications",
                    ["S/N", "Title", "Authors", "Organization", "Year", "Staff Name"],
                    publications.nanTitles.map((nan, index) => [
                        (index + 1).toString(),
                        nan.title,
                        nan.authors.join(", "),
                        nan.organization,
                        nan.year.toString(),
                        nan.staffName,
                    ])
                ),
            ],
        });
    }

    // Save the document
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(`${departmentName}_Publication_Report.docx`, buffer);
        console.log("Report has been created successfully");
    });
}

module.exports = generateDepartmentReport;
