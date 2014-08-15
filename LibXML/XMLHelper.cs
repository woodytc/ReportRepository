using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LibXML
{
    public static class XMLHelper
    {
        public static string GenerateElement(string elementName, string data)
        {
            return ProcessData(elementName, data.Split(new char[] { '|'}).ToList<string>());
        }

        private static string ProcessData(string elementName, List<string> listdata)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(string.Format("<{0}>\n", elementName));
            foreach (var tmp in listdata)
            {
                if (!string.IsNullOrEmpty(tmp) && !tmp.Equals("O") && !string.IsNullOrWhiteSpace(tmp))
                {
                    var key = tmp.Substring(tmp.IndexOf('<') + 1, tmp.IndexOf('>') - tmp.IndexOf('<') - 1);
                    var value = tmp.Substring(tmp.IndexOf('>') + 1);
                    sb.Append(string.Format("<{0}>{1}</{0}>\n", key, value));
                }
            }
            sb.Append(string.Format("</{0}>", elementName));
            return sb.ToString(); ;
        }
    }
}
