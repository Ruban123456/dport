import os
try:
    from fpdf import FPDF
except ImportError:
    import sys
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf"])
    from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'DHANISH MK - CV', 0, 1, 'C')
        self.set_line_width(0.5)
        self.line(10, 20, 200, 20)
        self.ln(10)

pdf = PDF()
pdf.add_page()
pdf.set_font("Arial", size=11)

try:
    with open("assets/cv.txt", "r", encoding="utf-8") as f:
        for line in f:
            pdf.multi_cell(0, 6, txt=line.strip("\n"))
    
    pdf.output("assets/cv.pdf")
    print("PDF generated successfully at assets/cv.pdf")
except Exception as e:
    print(f"Error generating PDF: {e}")
