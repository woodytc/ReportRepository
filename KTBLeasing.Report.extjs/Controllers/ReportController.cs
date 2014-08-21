﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Reporting.WebForms;
using System.Collections;
using KTBLeasing.Report.extjs.Properties;

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

        public ActionResult SSRSReport(string ReportName, Dictionary<string, string> ReportParameters)
        {
            Session["ReportServer"] = Settings.Default.SSRSReportServer;
            Session["ReportPath"] = Settings.Default.SSRSReportPath;
            Session["ReportParameters"] = ReportParameters;
            Session["ReportName"] = ReportName;
            
            return Redirect("../Reports/frmReportingServiceViewer.aspx");
        }

        public ActionResult GetReportByID()
        {
            // Use this for an action
            return RedirectToAction("Index");
            // Use this for a URL
            //return Redirect("http://192.168.1.109/MWT/Taglist/ShowMap" + LastId);
        }

        public ActionResult ReportYield()
        {
            Dictionary<string,string> param = new Dictionary<string,string>();
            param.Add("StartDate", new DateTime(DateTime.Now.Year, 1, 1).ToString());
            param.Add("EndDate", DateTime.Now.ToString());
            //param.Add("null", "null");
            return this.SSRSReport("rptYield1", param);
        }
        
    }
}
