using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KTBLeasing.ReportWeb.Models;

namespace KTBLeasing.ReportWeb.Controllers
{
    public class HomeController : Controller
    {
        

        public HomeController()
        {
            
        }
        //
        // GET: /Home/
        
        public ActionResult Index()
        {
            //List<FromHelper> list = new List<FromHelper>();
            
            //list.Add(Addsettings("enumPositionType.left",150,150));

            return View();
        }

        public ActionResult Tabs()
        {
            return View();
        }

        public ActionResult extjs()
        {
            return View();
        }

        public JsonResult froms()
        {

            return null;//Json(new { list }, JsonRequestBehavior.AllowGet);
        }

        //GriD Data
        #region GridData
        public JsonResult GridReport(string Name="")
        {
            List<ReportListModel> lreport = new List<ReportListModel>();
             lreport.Add(new ReportListModel{
                   Id = 1,
                   Name = "Yield เบิกสะสม"

             });

             lreport.Add(new ReportListModel{
                 Id=2,
                 Name ="Yield เบิกสะสม แยกตามประเภททรัพย์สิน 10 ประเภท"
             });

             var result = (String.IsNullOrEmpty(Name))?lreport:lreport.Where(x => x.Name.Contains(Name));
             return Json(new { items = result, total = result.Count() }, JsonRequestBehavior.AllowGet);
        }
        #endregion


    }
}
