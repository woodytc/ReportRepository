using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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

        public ActionResult GetReportByID()
        {
            // Use this for an action
            return RedirectToAction("Index");
            // Use this for a URL
            //return Redirect("http://192.168.1.109/MWT/Taglist/ShowMap" + LastId);
        }

    }
}
