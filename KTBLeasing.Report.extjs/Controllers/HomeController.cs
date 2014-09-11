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
using System.Web.Security;
using Newtonsoft.Json;
using KTBLeasing.Domain.Model;

namespace KTBLeasing.ReportWeb.Controllers
{
    public class HomeController : Controller
    {
        private IReportRepository ReportRepository { get; set; }
        private IMasterProvinceRepository ProvinceRepository { get; set; }
        private IMasterCodeEQPRepository MasterCodeEQPRepository { get; set; }
        private IMasterMappingEQPAndAssetTypeRepository MasterMappingEQPAndAssetTypeRepository { get; set; }
        private IMasterAssetTypeRepository MasterAssetTypeRepository { get; set; }

        public HomeController(IReportRepository reportRepository, IMasterProvinceRepository masterProvinceRepository,
            IMasterCodeEQPRepository masterCodeEQPRepository, 
            IMasterMappingEQPAndAssetTypeRepository masterMappingEQPAndAssetTypeRepository,
            IMasterAssetTypeRepository MasterAssetTypeRepository)
        {
            this.ReportRepository = reportRepository;
            this.ProvinceRepository = masterProvinceRepository;
            this.MasterCodeEQPRepository = masterCodeEQPRepository;
            this.MasterMappingEQPAndAssetTypeRepository = masterMappingEQPAndAssetTypeRepository;
            this.MasterAssetTypeRepository = MasterAssetTypeRepository;
        }
        //
        // GET: /Home/
        
        public ActionResult Index()
        {
            ViewBag.User = User.Identity.Name;
            if (!User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "User");
            }
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
        public JsonResult CreateMappingAsset(FormCollection entity)
        {
            try
            {
                var AssetID = entity["AssetID"];
                var listGird = entity["listGird"];

                var listJsonResult = JsonConvert.DeserializeObject<List<AssetTypeMappingModel>>(listGird);
                listJsonResult.ForEach(x =>
                {
                    x.AssetID = (!string.IsNullOrEmpty(AssetID)) ? int.Parse(AssetID) : 0;
                    MasterMappingEQPAndAssetType mapEntity = new MasterMappingEQPAndAssetType
                    {
                        ID = x.ID,
                        AssetID = x.AssetID,
                        EQPCode = x.EQPCode,
                        IsDelete = x.IsDelete,
                        UpdateDate = x.UpdateDate,
                        UpdateUser = User.Identity.Name
                    };
                    this.MasterMappingEQPAndAssetTypeRepository.SaveOrUpdate(mapEntity);

                });
                return Json(new { success = true, message = "บันทึกข้อมูลสำเร็จ" }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                return Json(new { success = false, message = "ไม่สามารถบันทึกข้อมูลได้" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult DeleteMappingAsset(List<int> entity)
        {
            try
            {
                this.MasterMappingEQPAndAssetTypeRepository.Delete(entity);
                return Json(new { success = true, message = "ลบข้อมูลสำเร็จ" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(new { success = false, message = "ไม่สามารถลบข้อมูลได้" }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CreateEQP(FormCollection entity)
        {
            try
            {
                var EQPCode = int.Parse(entity["EQPCode"]);
                var EQPDescription = entity["EQPDescription"];

                MasterCodeEQP _objMasterCodeEQP = new MasterCodeEQP
                {
                    EQPCode = EQPCode,
                    AssetCode = 11,
                    ComID = "1",
                    EQPDescription = EQPDescription
                };

                var status = this.MasterCodeEQPRepository.Insert(_objMasterCodeEQP);

                //x.AssetID = (!string.IsNullOrEmpty(_objMasterCodeEQP.AssetCode.ToString())) ? int.Parse(_objMasterCodeEQP.AssetCode.ToString()) : 0;
                
                if (status == true)
                {
                    MasterMappingEQPAndAssetType mapEntity = new MasterMappingEQPAndAssetType
                    {
                        //ID = x.ID,
                        AssetID = _objMasterCodeEQP.AssetCode,
                        EQPCode = _objMasterCodeEQP.EQPCode,
                        IsDelete = false,
                        UpdateDate = DateTime.Now,
                        UpdateUser = User.Identity.Name
                    };
                    this.MasterMappingEQPAndAssetTypeRepository.SaveOrUpdate(mapEntity);
                }

                return Json(new { success = status, message = (status) ? "บันทึกข้อมูลสำเร็จ" : "ไม่สามารถบันทึกข้อมูลได้" }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                return Json(new { success = false, message = "ไม่สามารถบันทึกข้อมูลได้" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult UpdateEQP(FormCollection entity)
        {
            try
            {
                var EQPCode = int.Parse(entity["EQPCode"]);
                var EQPDescription = entity["EQPDescription"];

                MasterCodeEQP _objMasterCodeEQP = new MasterCodeEQP
                {
                    EQPCode = EQPCode,
                    AssetCode = 11,
                    ComID = "1",
                    EQPDescription = EQPDescription
                };

                var status = this.MasterCodeEQPRepository.Update(_objMasterCodeEQP);
                return Json(new { success = status, message = (status) ? "บันทึกข้อมูลสำเร็จ" : "ไม่สามารถบันทึกข้อมูลได้" }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                return Json(new { success = false, message = "ไม่สามารถบันทึกข้อมูลได้" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult DeleteEQP(List<int> entity)
        {
            try
            {
                var status = this.MasterCodeEQPRepository.Delete(entity);
                return Json(new { success = status, message = (status) ? "ลบข้อมูลสำเร็จ" : "ไม่สามารถลบข้อมูลได้" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(new { success = false, message = "ไม่สามารถลบข้อมูลได้" }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CreateAssetType(FormCollection entity)
        {
            try
            {
                var ID = int.Parse(entity["ID"]);
                var AssetType = entity["AssetType"];

                MasterAssetType _objMasterAssetType = new MasterAssetType
                {
                    ID = ID,
                    AssetType = AssetType,
                };

                var status = this.MasterAssetTypeRepository.Insert(_objMasterAssetType);
                return Json(new { success = status, message = (status) ? "บันทึกข้อมูลสำเร็จ" : "ไม่สามารถบันทึกข้อมูลได้" }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                return Json(new { success = false, message = "ไม่สามารถบันทึกข้อมูลได้" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult UpdateAssetType(FormCollection entity)
        {
            try
            {
                var ID = int.Parse(entity["ID"]);
                var AssetType = entity["AssetType"];

                MasterAssetType _objMasterAssetType = new MasterAssetType
                {
                    ID = ID,
                    AssetType = AssetType,
                };

                var status = this.MasterAssetTypeRepository.Update(_objMasterAssetType);
                return Json(new { success = status, message = (status) ? "บันทึกข้อมูลสำเร็จ" : "ไม่สามารถบันทึกข้อมูลได้" }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                return Json(new { success = false, message = "ไม่สามารถบันทึกข้อมูลได้" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult DeleteAssetType(List<int> entity)
        {
            try
            {
                var status = this.MasterAssetTypeRepository.Delete(entity);
                return Json(new { success = status, message = (status) ? "ลบข้อมูลสำเร็จ" : "ไม่สามารถลบข้อมูลได้" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {

                return Json(new { success = false, message = "ไม่สามารถลบข้อมูลได้" }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion



        //GriD Data
        #region GridData
        
        public JsonResult GridReport(string Name = "")
        {
            var result = ReportRepository.Get().OrderBy(x => x.Id).ToList<KTBLeasing.Domain.Report>();
            result = (String.IsNullOrEmpty(Name)) ? result : result.Where<KTBLeasing.Domain.Report>(x => x.Reportname.Contains(Name)).ToList<KTBLeasing.Domain.Report>();
            return Json(new { items = result, total = result.Count() }, JsonRequestBehavior.AllowGet);
        }

        /** [20140902] by pom **/
        public JsonResult GridMappingAsset(string Name = "",int start=0, int limit=0)
        {
            var result = this.MasterMappingEQPAndAssetTypeRepository.GetMappingAssetTypeList()
                            .Where(x => x.EQPDescription.Contains(Name.ToLower()) || x.AssetType.Contains(Name.ToLower()));
            var page = (start == 0 && limit == 0) ? result : result.Skip(start).Take(limit);

            return Json(new { items = page, total = result.Count() }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GridGetEQP(string Name = "", int start = 0, int limit = 0)
        {
            var result = this.MasterCodeEQPRepository.Get().Select(x=>new{x.EQPCode,x.EQPDescription,x.ComID});
            var page = (start == 0 && limit == 0) ? result : result.Skip(start).Take(limit);

            return Json(new { items = page, total = result.Count() }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GridAssetType(string Name = "", int start = 0, int limit = 0)
        {
            var result = this.MasterAssetTypeRepository.Get().Where(x => x.AssetType.ToLower().Contains(Name.ToLower()) && x.ID != 11);
            var page = (start == 0 && limit == 0) ? result : result.Skip(start).Take(limit);

            return Json(new { items = page, total = result.Count() }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GridReportPage(int start, int limit, string direction)
        {
            string xss = "";

            return Json(new { items = "", total = 10 }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Combobox data
        public JsonResult GetMasterAssetType()
        {
            var result = this.MasterAssetTypeRepository.Get().Select(x => new { name = x.ID, value = x.AssetType });
            return Json(new { items = result, total = result.Count()}, JsonRequestBehavior.AllowGet);
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
            var filterresult = (from x in result select new { Name = (x.AgrSts == "A") ? x.AgrStsName : "รวม Close", AgrStatus = (x.AgrSts == "A") ? x.AgrSts : "" }).GroupBy(x => new { x.Name, x.AgrStatus }).Select(x => new { x.Key.Name, x.Key.AgrStatus }).ToList();
            
            
            //return Json(new { items = result.Select(x => new { Name = x.AgrStsName, AgrStatus = x.AgrSts }), total = result.Count }, JsonRequestBehavior.AllowGet);
            return Json(new { items = filterresult, total = filterresult.Count() }, JsonRequestBehavior.AllowGet);
        }

    }
}
