using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography;

namespace lisperanto.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public async Task<IActionResult> Index()
        {

            
            var new_page = await GenerateLisperanto();
            Response.Redirect(new_page);
            return View();
        }

        [HttpPost]
        public async Task SaveCustomObject(string hash, string value)
        {
            var directory_info = Directory.CreateDirectory("customObjects");
            string path_with_hash = Path.Combine(directory_info.FullName, $"{hash}.json");
            if(System.IO.File.Exists(path_with_hash))
            {
                return;
            }
            using (var file_stream = System.IO.File.Create(path_with_hash))
            {
                using(StreamWriter stream_writer = new StreamWriter(file_stream, System.Text.Encoding.UTF8))
                {
                    await stream_writer.WriteAsync(value);
                }
            }
            var parsed = System.Text.Json.JsonDocument.Parse(value);
            try
            {
                //Console.WriteLine($"Parsed : {parsed.RootElement.ToString()}" );
                string definition = parsed.RootElement.GetProperty("javascript-function-definition@lisperanto").ToString();
                string name = parsed.RootElement.GetProperty("name@lisperanto").ToString();
                string directory_path = Path.Combine(Directory.GetCurrentDirectory(), "js", "lisperanto");
                var path_to_js = Path.Combine(directory_path, $"{name}.js");
                Console.WriteLine($"Path to file: {path_to_js}");
                definition = $"// Version hash: {hash}\r\n" +
                    "if(typeof(lisperanto) === 'undefined')\r\n{\r\n\tlisperanto = {};\r\n}\r\n\r\n" +
                    $"lisperanto.{name} = {definition};";
                Directory.CreateDirectory(directory_path);
                using(var file_stream_js = System.IO.File.Create(path_to_js))
                {
                    using(StreamWriter stream_writer = new StreamWriter(file_stream_js, System.Text.Encoding.UTF8))
                    {
                        await stream_writer.WriteAsync(definition);
                    }
                }
                //Console.WriteLine(definition);
            }
            catch(KeyNotFoundException _)
            {}
        }

        private async Task<string> GenerateLisperanto()
        {
            Console.WriteLine(nameof(GenerateLisperanto));
            string directory_path = Path.Combine(Directory.GetCurrentDirectory(), "js", "lisperanto");
            
            var files = Directory.GetFiles(directory_path).OrderBy(path => path);
            MemoryStream in_memory_stream = new MemoryStream();
            string file_name;
            string string_hash = "";
            using (StreamWriter stream_writer = new StreamWriter(in_memory_stream))
            {
                foreach(var path in files)
                {
                    //Console.WriteLine(path);
                    using(StreamReader stream_reader = new StreamReader(path))
                    {
                        stream_writer.Write(stream_reader.ReadToEnd());
                    }
                }
                var just_copy = new MemoryStream();
                in_memory_stream.WriteTo(just_copy);
                
                using (SHA256 sha256Hash = SHA256.Create())
                {
                    var hash = await sha256Hash.ComputeHashAsync(just_copy);
                    string_hash = String.Join("", hash.Select(h => h.ToString("x2")));
                }

                file_name = $"lisperanto_{string_hash}.js";

                var target_path = Path.Combine(Directory.GetCurrentDirectory(), "docs","js", file_name );

                using(StreamWriter actual_writer = new StreamWriter(target_path))
                {
                    in_memory_stream.WriteTo(actual_writer.BaseStream);
                    actual_writer.Flush();
                }
            }

            string index_path = Path.Combine(Directory.GetCurrentDirectory(), "docs", "index.html");
            string resulted_name = $"index_{string_hash}.html";
            string new_index_path = Path.Combine(Directory.GetCurrentDirectory(), "docs", resulted_name);
            using(StreamReader reader = new StreamReader(index_path))
            using(StreamWriter writer = new StreamWriter(new_index_path))
            {
                int watch_dog = 5_000;
                while(reader.EndOfStream == false && watch_dog > 0)
                {
                    watch_dog--;
                    string line = reader.ReadLine();
                    if (line.Contains("<lisperanto.latest.version/>"))
                    {
                        line = line.Replace("<lisperanto.latest.version/>", 
                            $"<script src=\"js/{file_name}\" asp-append-version=\"true\"></script>");
                    }
                    writer.WriteLine(line);
                }
                
            }

            return resulted_name;
        }

        [HttpPost]
        public async Task SaveOperation(string hash, string value)
        {
            var directory_info = Directory.CreateDirectory("operations");
            using(var file_stream = System.IO.File.Create(Path.Combine(directory_info.FullName, $"{hash}.json")))
            {
                using(StreamWriter stream_writer = new StreamWriter(file_stream, System.Text.Encoding.UTF8))
                {
                    await stream_writer.WriteAsync(value);
                }
            }
            
        }

        [HttpGet]
        public async Task<string[]> ListOfCustomObjects()
        {
            string directory_path = Path.Combine(Directory.GetCurrentDirectory(), "customObjects");
            var files = Directory.GetFiles(directory_path).OrderBy(path => path).Select(path => Path.GetFileNameWithoutExtension(path)).ToArray();
            return files;
        }

        [HttpGet]
        public async Task<string[]> ListOfOperations()
        {
            string directory_path = Path.Combine(Directory.GetCurrentDirectory(), "operations");
            var files = Directory.GetFiles(directory_path).OrderBy(path => path).Select(path => Path.GetFileNameWithoutExtension(path)).ToArray();
            return files;
        }

        public class CustomObjectResult
        {
            public string Hash {get; set;}
            public string Value {get; set;}
        }

        [HttpGet]
        public CustomObjectResult GetCustomObject(string hash)
        {
            string target_path = Path.Combine(Directory.GetCurrentDirectory(), "customObjects", $"{hash}.json");

            using(StreamReader stream_reader = new StreamReader(target_path))
            {
                return new CustomObjectResult
                {
                    Hash = hash,
                    Value = stream_reader.ReadToEnd()
                };
            }
        }

        public class OperationResult
        {
            public string Key {get; set;}
            public string Value {get; set;}
        }

        [HttpGet]
        public OperationResult GetOperation(string key)
        {
            string target_path = Path.Combine(Directory.GetCurrentDirectory(), "operations", $"{key}.json");

            using(StreamReader stream_reader = new StreamReader(target_path))
            {
                return new OperationResult
                {
                    Key = key,
                    Value = stream_reader.ReadToEnd()
                };
            }
        }
    }
}
