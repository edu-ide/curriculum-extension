import * as vscode from 'vscode';

export interface SubCurriculum {
    label: string;
    progress: number;
}

export class CurriculumItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly type: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly progress: number = 0,
        public readonly subItems: SubCurriculum[] = []
    ) {
        super(label, collapsibleState);
        this.tooltip = new vscode.MarkdownString(`## ${label}\n\n진행률: ${progress}%\n\n${this.getTooltipDetails()}`);
        this.description = `${progress}% 완료`;
        this.iconPath = this.getIconByProgress(progress);
        this.command = {
            title: '튜토리얼 시작',
            command: 'edu-curriculum.selectPath',
            arguments: [type]
        };
    }

    private getIconByProgress(progress: number): vscode.ThemeIcon {
        if (progress === 0) return new vscode.ThemeIcon('circle-outline');
        if (progress < 50) return new vscode.ThemeIcon('circle-slash');
        if (progress < 100) return new vscode.ThemeIcon('circle-half-filled');
        return new vscode.ThemeIcon('pass-filled');
    }

    private getTooltipDetails(): string {
        return this.subItems.map(item => 
            `- ${item.label}: ${item.progress}% 완료`
        ).join('\n');
    }
}

export class SubCurriculumItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly progress: number,
        private type: string
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.tooltip = new vscode.MarkdownString(`## ${label}\n\n진행률: ${progress}%`);
        this.description = `${progress}% 완료`;
        this.iconPath = this.getIconByProgress(progress);
        this.command = {
            title: '튜토리얼 시작',
            command: 'edu-curriculum.selectPath',
            arguments: [type]
        };
    }

    private getIconByProgress(progress: number): vscode.ThemeIcon {
        if (progress === 0) {
            return new vscode.ThemeIcon('circle-large-outline');
        } else if (progress < 50) {
            return new vscode.ThemeIcon('circle-large-filled', new vscode.ThemeColor('charts.red'));
        } else if (progress < 100) {
            return new vscode.ThemeIcon('circle-large-filled', new vscode.ThemeColor('charts.yellow'));
        }
        return new vscode.ThemeIcon('circle-large-filled', new vscode.ThemeColor('charts.green'));
    }
}
