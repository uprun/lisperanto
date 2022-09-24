using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace lisperanto.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            Response.Redirect("/index.html");
            return View();
        }

        [HttpPost]
        public async Task SaveCustomObject(string hash, string value)
        {
            var directory_info = Directory.CreateDirectory("customObjects");
            using(var file_stream = System.IO.File.Create(Path.Combine(directory_info.FullName, $"{hash}.json")))
            {
                using(StreamWriter stream_writer = new StreamWriter(file_stream, System.Text.Encoding.UTF8))
                {
                    await stream_writer.WriteAsync(value);
                }
            }
            
        }
    }
}
