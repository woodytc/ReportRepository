using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Web.Mvc;
//using System.Web.Script.Serialization;
using KTBLeasing.Domain.Repositoy;
using System.Web.Mvc;
using System.Configuration;
using System.Web.Script.Serialization;


namespace WebReport.Controllers
{
    public class ReportController : Controller
    {
        //
        // GET: /Report/
        [ConfigurationPropertyAttribute("maxJsonLength", DefaultValue = 2000000 )]
        public int MaxJsonLength { get; set; }

        public IBatchtbRepository BatchtbRepository { get; set; }
        public ReportController(IBatchtbRepository batchtbRepository)
        {
            BatchtbRepository = batchtbRepository;
        }
        public ActionResult Index()
        {
            //BatchtbRepository.Get();
            //ViewBag.JsonResult = testData().ToString();
            return View();
        }

        [HttpGet]
        public JsonResult testData()
        {
            var reslut = BatchtbRepository.GetLimit();
            return Json(new { data = reslut }, JsonRequestBehavior.AllowGet);
            //return new LargeJsonResult
            //{
            //    MaxJsonLength = 20000000,
            //    JsonRequestBehavior = JsonRequestBehavior.AllowGet,
            //    Data = new
            //    {
            //        reslut
            //    }
            //};
        }

        [HttpGet]
        public JsonResult testData1()
        {
            return null;
        }

    }
}
