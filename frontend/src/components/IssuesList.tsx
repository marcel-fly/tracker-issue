import React from "react";
import { Issue } from "./Issue";
import './IssuesList.css';
interface issue {
    title: string,
    description: string, 
    id: number
}

interface Props {
    title: string,
    color: string,
    issuesData: Array<issue>
    typeIssue: string
}

export const IssuesList: React.FC<Props>= ({title, color, issuesData, typeIssue}) => {
    console.log(issuesData);
    return (
        <div className={'issuesList-wrapper'}>
            <h2 className="issuesList-header" style={{backgroundColor: color}} >{title}</h2>
            {issuesData.map( (issueData: issue) => (
                <Issue 
                    description={issueData.description} 
                    title={issueData.title} 
                    id={issueData.id} 
                    type={typeIssue} 
                    color={color}
                />
            ))}
                
        </div>
    );

};