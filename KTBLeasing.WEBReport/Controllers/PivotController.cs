using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KTBLeasing.Domain.Repositoy;

namespace KTBLeasing.WEBReport.Controllers
{
    public class PivotController : Controller
    {
        public IBatchtbRepository BatchtbRepository { get; set; }

        public PivotController(IBatchtbRepository batchtbRepository)
        {
            BatchtbRepository = batchtbRepository;
        }
        //
        // GET: /Pivot/

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Get()
        {
            try
            {
                var result = BatchtbRepository.Get();
                return Json(new { pivot_dataset = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
