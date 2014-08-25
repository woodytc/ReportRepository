using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KTBLeasing.ReportWeb.Models;
using KTBLeasing.Domain;
using KTBLeasing.Domain.Repositoy;
using KTBLeasing.Report.extjs.Models;
using Microsoft.Reporting.WebForms;
using KTBLeasing.Helpers;

namespace KTBLeasing.ReportWeb.Controllers
{
    public class HomeController : Controller
    {
        private IReportRepository ReportRepository { get; set; }
        private IMasterProvinceRepository ProvinceRepository { get; set; }
        private IMasterMappingCodeEQPMapRepository EPQMapAssetTypeREpository { get; set; }

        public HomeController(IReportRepository reportRepository, IMasterProvinceRepository masterProvinceRepository,
            IMasterMappingCodeEQPMapRepository masterMappingCodeEQPMapRepository)
        {
            this.ReportRepository = reportRepository;
            this.ProvinceRepository = masterProvinceRepository;
            this.EPQMapAssetTypeREpository = masterMappingCodeEQPMapRepository;
            
        }
        //
        // GET: /Home/
        
        public ActionResult Index()
        {
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

            return null;
        }

        public void GetReportByID()
        {

        }

        public JsonResult tree()
        {
            RootObject rootojb = new RootObject();
            Child child1 = new Child();
            Child2 child2 = new Child2();

            var result = this.ProvinceRepository.GetTest();
           // var a = result.Select(x => x.MasterRegion).OfType<MasterRegion>();
            //var b = result.Select(x => x.MasterDepartment).GroupBy(x => x.Code).OfType<MasterDepartment>();
            //var c = result.Select(x => new { x.Id, x.Name, x.MasterRegion.Code, x.MasterRegion.Name }).OfType<Object>(); 
            return Json(new { b = result }, JsonRequestBehavior.AllowGet);
        }

        #region function Create Data CURL
        [HttpPost]
        public JsonResult CreateReport(KTBLeasing.Domain.Report entity)
        {
            try
            {
                this.ReportRepository.SaveOrUpdate(entity);
            }
            catch (Exception e)
            {

            }
            return null;
        }
        #endregion



        //GriD Data
        #region GridData
        
        public JsonResult GridReport(string Name = "")
        {
            var result = ReportRepository.Get();
            result = (String.IsNullOrEmpty(Name)) ? result : result.Where<KTBLeasing.Domain.Report>(x => x.Reportname.Contains(Name)).ToList<KTBLeasing.Domain.Report>();
            return Json(new { items = result, total = result.Count() }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GridReportPage(int start, int limit, string direction)
        {
            string xss = "";

            return Json(new { items = "", total = 10 }, JsonRequestBehavior.AllowGet);
        }
        #endregion


        /**[20140822] Thawatchai.T Get parameter report by report id*/
        public JsonResult GetParameterReport(int id)
        {
            var result = ReportRepository.GetParameterReport<Reportparameter>(id);
            var paraname = from x in result where x.ReportID == id select new { ReportID = x.ReportID, ParameterID = x.ParamID, ParameterName = x.Parameter.Name };

            return Json(new { items = paraname, total = paraname.Count(), success=(paraname.Count()>0)?true:false }, JsonRequestBehavior.AllowGet);
        }

        /** [20140825] Thawatchai.T getComboParameter report AGRStauts */
        public JsonResult GetAgrStatus()
        {
            var result = this.ReportRepository.GetAgrStatus();

            return Json(new { items = result.Select(x => new { Name = x.AgrStsName, AgrStatus = x.AgrSts }), total = result.Count }, JsonRequestBehavior.AllowGet);
        }

    }
}
