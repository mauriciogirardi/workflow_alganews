import { AlgaNews } from "./AlgaNews";

export namespace User {
    export type EditorSummary = AlgaNews.components['schemas']['EditorSummary']
    export type Detailed = AlgaNews.components['schemas']['UserDetailed']
    export type Summary = AlgaNews.components['schemas']['UserSummary']
    export type Minimal = AlgaNews.components['schemas']['UserMinimal']
    export type Metrics = AlgaNews.components['schemas']['UserMetrics']
    export type Input = AlgaNews.components['schemas']['UserInput']
    export type EditorDetailed = AlgaNews.components['schemas']['EditorDetailed']
    export type Skill = AlgaNews.components['schemas']['Skill']
    export type Role = AlgaNews.components['schemas']['Role']
}
