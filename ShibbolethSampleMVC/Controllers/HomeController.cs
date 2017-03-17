using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShibbolethSampleMVC.Filter;
using ShibbolethSampleMVC.Models;

namespace ShibbolethSampleMVC.Controllers
{
    /// <summary>
    /// HomeController represents a Controller where some views are protected, and some are
    /// not.  In addition, the Forbidden view represents a page protected by a role that doesn't
    /// exist, so will not be visitable. 
    /// </summary>
    /// <seealso cref="System.Web.Mvc.Controller" />
    public class HomeController : Controller
    {
        
        public ActionResult Index()
        {
            return View();
        }

        [AuthorizationFilter(Auth=true, Roles = "admin")]
        public ActionResult Protected()
        {
            return View();
        }

        [AuthorizationFilter(Auth = true, Roles="nonexistentRole")]
        public ActionResult Forbidden()
        {
            return View();
        }
    }
}