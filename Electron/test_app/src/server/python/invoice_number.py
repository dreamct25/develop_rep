
from urllib.request import Request as req, urlopen
from urllib.error import HTTPError as error
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(),encoding='utf8')

def getPageCode():
    src = "https://invoice.etax.nat.gov.tw/invoice.xml"
    try:
        res = urlopen(req(src))
        pageDetails = res.read().decode("UTF-8")
        print(pageDetails)
    except error as err:
        print(f"Fail code : {err.code}，Fail reason : {err.reason}")

getPageCode()