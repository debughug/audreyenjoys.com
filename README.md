# audreyenjoys.com Documentation

AudreyEnjoys is a food blog by Audrey Stein. https://audreyenjoys.com/

## Technologies Used

List of primary technologies used to make this site happen

| Tech            | Reason                                                               |
| --------------- | -------------------------------------------------------------------- |
| Node v12.18.4   | I think NPM requires this, I forgot.                                 |
| NPM v6.14.6     | I know to avoid the reinvention of the wheel.                        |
| React v16.13.1  | I never get to use it and I like it.                                 |
| Axios v0.21.1   | To fetch the S3 file that has recipes.                               |
| S3-lambo v1.0.0 | To update the S3 asset with what's in Contentful.                    |
| dotenv v8.2.0   | To store my secret .env file and not expose it in this repo          |
| Contentful      | So Audrey has a way to update content and not bump me to code it in. |

## Deployment

Working on this, but for now - Audrey runs deploy.js so the S3 Recipes file updates with new content from Contentful.

---

I enjoy using https://dillinger.io/ for MDs
