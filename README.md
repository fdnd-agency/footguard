# FootGuard

## Datamodel

```mermaid
erDiagram
    USERINFO }o--o{ ARTICLES : many_to_many
    USERINFO }o--|| WORKGROUPS : many_to_one
    ARTICLES }o--|| WORKGROUPS : many_to_one
    ARTICLES ||--|| CHECKLIST : one_to_one

  USERINFO {
        int user_id
        string name
        string profession
        string email
        string institute
        string photo
        string role "admin, bestuur, beoordeler"
        JSON assigned_articles "reeks van article_id die assigned zijn aan deze user (JSON object)"
    }

  ARTICLES {
        int article_id
        string name
        int author
        date publishing_date
        string pdf "dit wordt de path van de pdf"
        int workgroup_id "id van een toegewezen workgroup"
        string status
    }

    WORKGROUPS {
        int workgroup_id
        string country
        string group_name
        JSON members "elke group heeft 2 users (2 keer user_id) (JSON object)"
    }

    CHECKLIST {
    int checklist_id "uniek id voor elke checklist"
    int article_id "id van een article zodat je weet welke article gelinkt is aan deze checklist"
    json questions "25 vragen in (JSON object)"
    string message
}
