using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShibbolethSampleMVC.Filter;

namespace ShibbolethSampleMVC.Controllers
{
    /// <summary>
    /// AdminController represents an entire section of code that is protected with one
    /// instance of AuthenticateController.  This would be for the Admin sections of your
    /// site, where no one without certain permissions should be allowed in.
    /// </summary>
    /// <seealso cref="System.Web.Mvc.Controller" />
    
    [AuthorizationFilter(Auth = true, Roles = "admin")]
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AnotherPage()
        {
            return View();
        }
    }
}