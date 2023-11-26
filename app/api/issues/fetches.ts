import { NewIssueForm } from "../../issues/new/page";

export default async function postIssue(formData: NewIssueForm){
    const options = {
        method: 'POST',
        body: JSON.stringify(formData),
    };
    return await fetch("/api/issues", options);
}