const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");
const outputDir = path.resolve(__dirname, "../output");
const html = [];


const render = input => {
    
    if (input.getRole() === "Manager") {
        let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
        template = replacePlaceholders(template, "name", input.getName());
        template = replacePlaceholders(template, "role", input.getRole());
        template = replacePlaceholders(template, "email", input.getEmail());
        template = replacePlaceholders(template, "id", input.getId());
        template = replacePlaceholders(template, "officeNumber", input.getOfficeNumber());
        html.push(template);
    }
    else if (input.getRole() === "Engineer") {
        let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
        template = replacePlaceholders(template, "name", input.getName());
        template = replacePlaceholders(template, "role", input.getRole());
        template = replacePlaceholders(template, "email", input.getEmail());
        template = replacePlaceholders(template, "id", input.getId());
        template = replacePlaceholders(template, "github", input.getGithub());
        html.push(template);
    }
    else if (input.getRole() === "Intern") {
        {
            let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
            template = replacePlaceholders(template, "name", input.getName());
            template = replacePlaceholders(template, "role", input.getRole());
            template = replacePlaceholders(template, "email", input.getEmail());
            template = replacePlaceholders(template, "id", input.getId());
            template = replacePlaceholders(template, "school", input.getSchool());
            html.push(template);
        }
    }
    let templates = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
    templates = replacePlaceholders(templates, "team", html);
    fs.writeFileSync(path.resolve(outputDir, "main.html"), templates)
};

  
const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{" + placeholder + "}}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
