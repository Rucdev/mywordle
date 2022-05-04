from PyPDF2 import PdfFileReader
from pathlib import Path

PDFPATH = "./backend/pdf/swe_at_google.2.pdf"


with open(PDFPATH, "rb") as f:
    pages = PdfFileReader(f)
    first_page = pages.getPage(333)

    print(first_page.extractText())
