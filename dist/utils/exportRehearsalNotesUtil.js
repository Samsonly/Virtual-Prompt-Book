"use strict";
////obv this is incomplete
Object.defineProperty(exports, "__esModule", { value: true });
const jspdf_1 = require("jspdf");
require("jspdf-autotable");
const exportRehearsalNotesUtil = (rehearsalNotes, department) => {
    const doc = new jspdf_1.jsPDF("p", "pt", "letter");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 36;
    const tableWidth = (pageWidth - 2 * margin) * 0.57;
    const headerText = department;
    const headerFontSize = 30;
    doc.setFontSize(headerFontSize);
    doc.setFont("times", "bold");
    const headerWidth = doc.getTextWidth(headerText);
    doc.text(headerText, (pageWidth - headerWidth) / 2, margin + headerFontSize);
    doc.setLineWidth(1);
    doc.line((pageWidth - headerWidth) / 2, margin + headerFontSize + 2, (pageWidth + headerWidth) / 2, margin + headerFontSize + 2);
    const staticTableColumns = [
        { header: "Code", dataKey: "col1" },
        { header: "Meaning", dataKey: "col2" },
        { header: "Code", dataKey: "col3" },
        { header: "Meaning", dataKey: "col4" },
    ];
    const staticTableRows = [
        { col1: "AW", col2: "Added Word(s)", col3: "JC", col4: "Jumped Cue" },
        { col1: "DW", col2: "Dropped Word(s)", col3: "MC", col4: "Missed Cue" },
        { col1: "WW", col2: "Wrong Word(s)", col3: "LC", col4: "Line Called" },
        { col1: "OOO", col2: "Out of Order", col3: "SK", col4: "Skipped Line" },
        {
            col1: "Bold",
            col2: "Word(s) Dropped",
            col3: "Strike",
            col4: "Word(s) Added",
        },
    ];
    doc.autoTable({
        startY: margin + headerFontSize + 20,
        head: [staticTableColumns.map((col) => col.header)],
        body: staticTableRows.map((row) => staticTableColumns.map((col) => row[col.dataKey])),
        columnStyles: {
            0: { cellWidth: tableWidth * 0.15, fontStyle: "bold" },
            1: { cellWidth: tableWidth * 0.35 },
            2: { cellWidth: tableWidth * 0.15, fontStyle: "bold" },
            3: { cellWidth: tableWidth * 0.35 },
        },
        styles: {
            overflow: "linebreak",
            halign: "center",
            valign: "middle",
            cellPadding: 5,
            lineWidth: 0.5,
            lineColor: 0,
            font: "times",
            textColor: 0,
        },
        margin: { left: (pageWidth - tableWidth) / 2 },
        headStyles: {
            fontStyle: "bold",
            fillColor: [255, 255, 255],
            fontSize: 10,
        },
        didDrawCell: (data) => {
            const { row, column, cell } = data;
            if (row.section === "head") {
                const cellText = Array.isArray(cell.text)
                    ? cell.text.join(" ")
                    : cell.text;
                const textWidth = doc.getTextWidth(cellText);
                const underlineY = cell.y + cell.height - 6.5;
                const textX = cell.x + (cell.width - textWidth) / 2;
                doc.setLineWidth(1);
                doc.line(textX, underlineY, textX + textWidth, underlineY);
            }
            if (row.index === 4 && column.index === 0) {
                const padding = 2;
                const cellText = Array.isArray(cell.text)
                    ? cell.text.join(" ")
                    : cell.text;
                doc.setFillColor(255, 255, 255);
                doc.rect(cell.x + padding, cell.y + padding, cell.width - 2 * padding, cell.height - 2 * padding, "F");
                doc.setFont("times", "bold");
                doc.setTextColor(0, 128, 0);
                doc.text(cellText, cell.x + cell.width / 2, cell.y + cell.height / 2, {
                    align: "center",
                    baseline: "middle",
                });
            }
            if (row.index === 4 && column.index === 2) {
                const padding = 2;
                const cellText = Array.isArray(cell.text)
                    ? cell.text.join(" ")
                    : cell.text;
                const textWidth = doc.getTextWidth(cellText);
                const textY = cell.y + cell.height / 2;
                doc.setFillColor(255, 255, 255);
                doc.rect(cell.x + padding, cell.y + padding, cell.width - 2 * padding, cell.height - 2 * padding, "F");
                doc.setFont("times", "bold");
                doc.setTextColor(255, 0, 0);
                doc.text(cellText, cell.x + cell.width / 2, cell.y + cell.height / 2, {
                    align: "center",
                    baseline: "middle",
                });
                const linePadding = 4;
                doc.setLineWidth(1);
                doc.setDrawColor(255, 0, 0);
                const strikeThroughX = cell.x + (cell.width - textWidth) / 2;
                doc.line(strikeThroughX - linePadding, textY, strikeThroughX + textWidth + linePadding, textY);
            }
        },
    });
    const calculateTextHeight = (textArray) => {
        let lineCount = 1;
        const cellWidth = (pageWidth - 2 * margin) * 0.9 - 10;
        let currentLineWidth = 0;
        const spaceWidth = doc.getTextWidth(" ");
        textArray.forEach((part) => {
            const wordWidth = doc.getTextWidth(part.text);
            if (currentLineWidth + spaceWidth + wordWidth > cellWidth) {
                lineCount++;
                currentLineWidth = wordWidth;
            }
            else {
                currentLineWidth += spaceWidth + wordWidth;
            }
        });
        return lineCount * doc.getLineHeight();
    };
    const getFontHeight = (doc) => {
        const tempDoc = new jspdf_1.jsPDF();
        tempDoc.setFont("times", "normal");
        tempDoc.setFontSize(doc.getFontSize());
        const text = "I";
        const textDimensions = tempDoc.getTextDimensions(text);
        return textDimensions.h * 2;
    };
    const calculateStartingY = (cell, textHeight, doc) => {
        const availableHeight = cell.height;
        const lineHeight = doc.getLineHeight();
        const fontHeight = getFontHeight(doc);
        const lineSpacing = lineHeight - fontHeight;
        const contentHeight = textHeight - lineSpacing;
        const cellPadding = (availableHeight - contentHeight) / 2;
        return cell.y + cellPadding + fontHeight;
    };
    const findDepartmentNotes = (rehearsalNotes, department) => {
        const departmentObj = rehearsalNotes.find((note) => note[department]);
        return departmentObj ? departmentObj[department] : [];
    };
    const departmentNotes = findDepartmentNotes(rehearsalNotes, department);
    // const errorCode = (errors: string[]) => {
    //   const errorMap: { [key: string]: string } = {
    //     "Added Word(s)": "AW",
    //     "Dropped Word(s)": "DW",
    //     "Wrong Word(s)": "WW",
    //     "Out of Order": "OOO",
    //     "Jumped Cue": "JC",
    //     "Missed Cue": "MC",
    //     "Line Called": "LC",
    //     "Skipped Line": "SK",
    //   };
    //   return errors.map((error) => errorMap[error] || error).join(", ");
    // };
    // const findCellHeight = (textArray: Word[]) => {
    //   const cellWidth = (pageWidth - 2 * margin) * 0.9 - 10;
    //   const wordArray: number[] = [];
    //   let lineCount = 0;
    //   let currentLineWidth = 0;
    //   doc.setFont("times", "normal");
    //   doc.setFontSize(10);
    //   const spaceWidth = doc.getTextWidth(" ");
    //   textArray.forEach((part) => {
    //     if (part.format === "dropped") {
    //       doc.setFont("times", "bold");
    //     } else {
    //       doc.setFont("times", "normal");
    //     }
    //     const wordWidth = doc.getTextWidth(part.text);
    //     wordArray.push(wordWidth);
    //   });
    //   wordArray.forEach((wordWidth) => {
    //     if (currentLineWidth + spaceWidth + wordWidth > cellWidth) {
    //       lineCount++;
    //       currentLineWidth = wordWidth;
    //     } else {
    //       currentLineWidth += spaceWidth + wordWidth;
    //     }
    //   });
    //   const rowHeight = "\n".repeat(lineCount);
    //   return rowHeight;
    // };
    // const dynamicTableRows = departmentNotes.map((note: RehearsalNote) => {
    //   const textArray = note.note;
    //   const rowHeight = findCellHeight(textArray);
    //   return {
    //     id: errorCode(note.error),
    //     note: textArray,
    //     height: rowHeight,
    //   };
    // });
    // const dynamicTableColumns = [
    //   { header: "ID", dataKey: "id" },
    //   { header: "Note", dataKey: "note" },
    // ];
    // (doc as any).autoTable({
    //   startY: (doc as any).lastAutoTable.finalY + 20,
    //   head: [dynamicTableColumns.map((col) => col.header)],
    //   body: dynamicTableRows.map((row) => [row.id, row.height]),
    //   columnStyles: {
    //     0: { cellWidth: (pageWidth - 2 * margin) * 0.1 },
    //     1: {
    //       cellWidth: (pageWidth - 2 * margin) * 0.9,
    //     },
    //   },
    //   styles: {
    //     overflow: "linebreak",
    //     valign: "middle",
    //     halign: "center",
    //     lineWidth: 0.5,
    //     lineColor: 0,
    //     font: "times",
    //     cellPadding: 5,
    //     fontSize: 10,
    //     textColor: 0,
    //   },
    //   headStyles: {
    //     fontStyle: "bold",
    //     fillColor: [255, 255, 255],
    //   },
    //   didDrawCell: (data: {
    //     row: { section: string; index: number };
    //     column: { index: number };
    //     cell: {
    //       text: string | string[];
    //       x: number;
    //       y: number;
    //       width: number;
    //       height: number;
    //       padding: (arg0: string) => number;
    //     };
    //   }) => {
    //     const { row, column, cell } = data;
    //     if (column.index === 1 && row.section === "body") {
    //       const textArray = dynamicTableRows[row.index].note;
    //       const textHeight = calculateTextHeight(textArray);
    //       let y = calculateStartingY(cell, textHeight, doc);
    //       let x = cell.x + cell.padding("left");
    //       textArray.forEach((part: Word) => {
    //         if (part.format === "dropped") {
    //           doc.setFont("times", "bold");
    //           doc.setTextColor(0, 128, 0);
    //         } else if (part.format === "added") {
    //           doc.setFont("times", "normal");
    //           doc.setTextColor(255, 0, 0);
    //         } else {
    //           doc.setFont("times", "normal");
    //           doc.setTextColor(0);
    //         }
    //         const textWidth = doc.getTextWidth(part.text);
    //         if (x + textWidth > cell.x + cell.width - cell.padding("right")) {
    //           x = cell.x + cell.padding("left");
    //           y += doc.getLineHeight();
    //         }
    //         if (part.format === "dropped") {
    //           doc.text(part.text, x, y);
    //           doc.setDrawColor(0, 128, 0);
    //           doc.setLineWidth(0.75);
    //           doc.line(x, y + 1.25, x + textWidth, y + 1.25);
    //           x += textWidth + doc.getTextWidth(" ");
    //         } else if (part.format === "added") {
    //           doc.text(part.text, x, y);
    //           doc.setDrawColor(255, 0, 0);
    //           doc.setLineWidth(0.75);
    //           doc.line(x - 0.5, y - 2.5, x + textWidth + 0.5, y - 2.5);
    //           x += textWidth + doc.getTextWidth(" ");
    //         } else {
    //           doc.text(part.text, x, y);
    //           x += textWidth + doc.getTextWidth(" ");
    //         }
    //       });
    //       cell.text = "";
    //     }
    //   },
    // });
    return doc;
};
exports.default = exportRehearsalNotesUtil;
