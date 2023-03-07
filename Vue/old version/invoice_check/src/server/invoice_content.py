from urllib.request import Request as req, urlopen
from urllib.error import HTTPError as error
import sys

def getPageCode():
    result = { 'date': sys.argv[1] }
    
    src = f"https://www.etax.nat.gov.tw/etw-main/ETW183W2_{result['date']}/"
    try:
        res = urlopen(req(src))
        pageDetails = res.read().decode("UTF-8")
        print(pageDetails)
    except error as err:
        print(f"Fail code : {err.code}，Fail reason : {err.reason}")

getPageCode()