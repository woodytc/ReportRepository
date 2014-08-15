using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using KTBLeasing.WEBReport.Models;

namespace KTBLeasing.WEBReport.Controllers
{
    public class UserManagementController : Controller
    {
        //
        // GET: /UserManagementController/

        public ActionResult Index()
        {
            return View();
        }

        string _userName = "";

        // GET: /UserManagement/
        public IMembershipService MembershipService { get; set; }

        public ActionResult AddRoles()
        {
            _userName = User.Identity.Name;
            if (string.IsNullOrEmpty(_userName))
            {
                return RedirectToAction("LogOn", "Account");
            }
            else if (User.IsInRole("Manage"))
            {
                ViewBag.CurrentUser = _userName;
                ViewBag.CurrentUserRole = "Manage";
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Dcm");
            }

        }

        //get All Role not implement
        public JsonResult GetRoles()
        {
            var results = Roles.GetAllRoles();
            return GetAllUserAndRoles(0, 0);

        }

        //data grid user and role
        public JsonResult GetUserAll(string username, string role, int start, int limit)
        {

            JsonResult result = null;
            if (string.IsNullOrEmpty(username) && role.ToLower().Equals("all role"))
            {
                return GetAllUserAndRoles(start, limit);
            }
            else if (string.IsNullOrEmpty(username) && !role.ToLower().Equals("all role"))
            {
                return FindUsernameWithRole(role, start, limit);
            }
            else if (!string.IsNullOrEmpty(username))
            {
                return FindUsernameWithRole(username, role.ToLower().Equals("all role") ? "" : role, start, limit);
            }
            else return result;

            //return result;


        }

        [HttpPost]
        //public ActionResult Register(RegisterModel model)
        public JsonResult Register(string UserName, string Password, string Email, string role)
        {
            if (ModelState.IsValid)
            {
                // Attempt to register the user
                if (MembershipService == null) { MembershipService = new AccountMembershipService(); }
                MembershipCreateStatus createStatus = MembershipService.CreateUser(UserName, Password, Email);

                if (createStatus == MembershipCreateStatus.Success)
                {
                    Roles.AddUserToRole(UserName, role);
                    return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, error = AccountValidation.ErrorCodeToString(createStatus) }, JsonRequestBehavior.AllowGet);

                }
            }

            return Json(new { success = true, error = "Can't registrer user!!!" }, JsonRequestBehavior.AllowGet); ;
        }



        private JsonResult FindUsernameWithRole(string role, int start, int limit)
        {
            var userRoles = (from MembershipUser user in Membership.GetAllUsers()
                             let roles = Roles.GetRolesForUser(user.UserName)
                             //where user.UserName.Contains(username) && roles.Equals(role)
                             select new
                             {
                                 UserName = user.UserName,
                                 Email = user.Email,
                                 Roles = (string.Join(", ", roles)).Replace("Manage", "User Management"),
                                 IsApproved = user.IsApproved ? "Enable" : "Disable"
                             });
            var dataPage = (from x in userRoles where x.Roles.Contains(role) select x).Skip(start).Take(limit);
            return Json(new { items = dataPage, total = dataPage.Count() }, JsonRequestBehavior.AllowGet);
        }

        private JsonResult FindUsernameWithRole(string username, string role, int start, int limit)
        {
            var userRoles = (from MembershipUser user in Membership.GetAllUsers()
                             let roles = Roles.GetRolesForUser(user.UserName)
                             //where user.UserName.Contains(username) && roles.Equals(role)
                             select new
                             {
                                 UserName = user.UserName,
                                 Email = user.Email,
                                 Roles = (string.Join(", ", roles)).Replace("Manage", "User Management"),
                                 IsApproved = user.IsApproved ? "Enable" : "Disable"
                             });
            var dataPage = (from x in userRoles where x.Roles.Contains(role) && (x.UserName.ToLower().Contains(username)) select x).Skip(start).Take(limit);
            return Json(new { items = dataPage, total = dataPage.Count() }, JsonRequestBehavior.AllowGet);
        }


        //get all userinfo
        public JsonResult GetAllUserAndRoles(int start, int limit)
        {
            var userRoles = (from MembershipUser user in Membership.GetAllUsers()
                             let roles = Roles.GetRolesForUser(user.UserName)
                             select new
                             {
                                 UserName = user.UserName,
                                 Email = user.Email,
                                 Roles = (string.Join(", ", roles)).Replace("Manage", "User Management"),
                                 IsApproved = user.IsApproved ? "Enable" : "Disable"
                             });
            var dataPage = (from x in userRoles select x).Skip(start).Take(limit);
            return Json(new { items = dataPage, total = userRoles.Count() }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FindUsernameWithRole(string username, string role)
        {
            var userRoles = (from MembershipUser user in Membership.GetAllUsers()
                             let roles = Roles.GetRolesForUser(user.UserName)

                             //where user.UserName.Contains(username) && roles.Equals(role)
                             select new
                             {
                                 UserName = user.UserName,
                                 Email = user.Email,
                                 Roles = (string.Join(", ", roles)).Replace("Manage", "User Management"),
                                 IsApproved = user.IsApproved ? "Enable" : "Disable"
                             });
            var dataPage = from x in userRoles where x.Roles.Contains(role) && (x.UserName.Contains(username)) select x;

            return Json(new { items = dataPage, total = dataPage.Count() }, JsonRequestBehavior.AllowGet);
        }

        //not implement
        public bool RemoveUser(string username)
        {
            bool status = Membership.DeleteUser(username, true);
            return status;
        }


        //reset password user
        [HttpPost]
        public JsonResult ResetPassword(string username, string password)
        {
            try
            {
                var user = Membership.GetUser(username);
                bool isChangeSuccess = user.ChangePassword(user.ResetPassword(), password);
                return Json(new { success = isChangeSuccess }, JsonRequestBehavior.AllowGet);
            }
            catch (MembershipPasswordException ex)
            {
                return Json(new { success = false, msg = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }

        }

        //assign role to user
        [HttpPost]
        public JsonResult UpdateUserRole(string username, string[] roles)
        {
            try
            {
                bool isUpdateUserRole = false;

                //remove role
                foreach (string rmrole in Roles.GetRolesForUser(username))
                {
                    Roles.RemoveUserFromRole(username, rmrole);
                }
                //var tmp = roles.Split(',');
                foreach (string item in roles)
                {
                    Roles.AddUserToRole(username, item);
                    isUpdateUserRole = Roles.IsUserInRole(username, item);
                }

                return Json(new { success = isUpdateUserRole }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }

        }

        //Disable user
        [HttpPost]
        public bool DisableUser(string username, bool status)
        {
            MembershipUser user = Membership.GetUser(username);
            try
            {
                if (user != null)
                {
                    //ture = disable flase = undisable
                    user.IsApproved = status;
                    Membership.UpdateUser(user);
                    user = Membership.GetUser(username);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                return false;
            }

        }


        public bool testlogin(string user, string pass)
        {
            bool status = Membership.ValidateUser(user, pass);
            FormsAuthentication.SetAuthCookie(user, true);
            return status;

        }

    }
}
