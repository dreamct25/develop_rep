from urllib.request import Request as req, urlopen
from urllib.error import HTTPError as error
import sys
def getPageCode():
    src = "https://invoice.etax.nat.gov.tw/invoice.xml"
    try:
        res = urlopen(req(src))
        pageDetails = res.read().decode("utf-8")
        print(pageDetails)
    except error as err:
        print(f"Fail code : {err.code}，Fail reason : {err.reason}")

    sys.stdout.flush()
getPageCode()

