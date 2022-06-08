from PyPDF2 import PdfFileReader
import nltk


PDFPATH = "./backend/pdf/swe_at_google.2.pdf"


page_text = ""
with open(PDFPATH, "rb") as f:
    pdf_file = PdfFileReader(f)

    for page_number in range(pdf_file.numPages):
        pdf_page = pdf_file.getPage(page_number)
        page_text += pdf_page.extractText()

# with open("output.txt", "w") as f:
#     for text_content in page_text:
#         f.writelines(text_content)

tokens = nltk.word_tokenize(page_text)

five_letters = set(x for x in tokens if len(x) == 5)
print(five_letters)
