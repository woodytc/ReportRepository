using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Reporting.WebForms;
using System.Collections;
using KTBLeasing.Report.extjs.Properties;
using KTBLeasing.Report.extjs.Models;
using KTBLeasing.Domain;
using Newtonsoft.Json;

namespace KTBLeasing.Report.extjs.Controllers
{
    public class ReportController : Controller
    {
        //
        // GET: /Report/

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SSRSReport(string ReportName, Dictionary<string, string> ReportParameters)
        //public ActionResult SSRSReport(ParameterModel rptparam)
        {
            Session.Clear();
            Session["ReportServer"] = Settings.Default.SSRSReportServer;
            Session["ReportPath"] = Settings.Default.SSRSReportPath;
            Session["ReportParameters"] = ReportParameters;//rptparam.Parameter;// 
            Session["ReportName"] = ReportName; //rptparam.ReportName;//
            
            return Json(new{url="../Reports/frmReportingServiceViewer.aspx"},JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetReportByID()
        {
            // Use this for an action
            return RedirectToAction("Index");
            // Use this for a URL
            //return Redirect("http://192.168.1.109/MWT/Taglist/ShowMap" + LastId);
        }

        public JsonResult ViewReport(string reportname, string[] paralist)
        {

            if (paralist.Count() > 0)
            {
                var listJsonResult = JsonConvert.DeserializeObject<List<ParaName>>(paralist[0]);
                Dictionary<string, string> dicpara = new Dictionary<string, string>();
                foreach (var items in listJsonResult)
                {
                    dicpara.Add(items.name, items.value);
                }
                
                return SSRSReport(reportname, dicpara);
            }
            else
            {
                Dictionary<string, string> dicpara = new Dictionary<string, string>();
                dicpara.Add(string.Empty, string.Empty);

                return SSRSReport(reportname, dicpara);
            }
        }
    }

    public class ParaName
    {
        public string name { get; set; }
        public string value { get; set; }
    }
}
