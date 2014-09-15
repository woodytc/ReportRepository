using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

using KTBLeasing.Report.extjs.WS_ActiveDirectory;

namespace Creating_a_custom_user_login_form.Controllers
{
    public class UserController : Controller
    {
        private KTBLeasing.Report.extjs.WS_ActiveDirectory.IWS_LoginAD _LoginService;

        public UserController(KTBLeasing.Report.extjs.WS_ActiveDirectory.IWS_LoginAD loginservice)
        {
            this._LoginService = loginservice;
        }

        //
        // GET: /User/
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(Models.User user)
        //public ActionResult Login(string username, string password)
        {
            //var user = new Models.User
            //{
            //    UserName = username,
            //    Password = password
            //};
            if (ModelState.IsValid)
            {
                if (this.CheckAD(user))
                {
                    FormsAuthentication.SetAuthCookie(user.UserName, user.RememberMe);
                    //return RedirectToAction("Index", "Home");
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    ModelState.AddModelError("", "Login data is incorrect!");
                    return Json(new { success = false, message = "รหัสผ่านไม่ถูกต้อง" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                ModelState.AddModelError("", "Login data is incorrect!");
                return Json(new { success = false, message = "รหัสผ่านไม่ถูกต้อง" }, JsonRequestBehavior.AllowGet);
            }

            //return Json(new { success = false }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "User");
        }

        public bool CheckAD(Models.User user)
        {
            //if (user.Password == "1")
            //{
            //    return true;
            //}

            LoginADRequest Request = new LoginADRequest(user.UserName, user.Password);
            var result = _LoginService.LoginAD(Request);
            return (result.@return.Equals("OK")) ? true : false;       
        }
    }
}
