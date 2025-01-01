import * as vscode from 'vscode';
import { CurriculumItem, SubCurriculumItem, SubCurriculum } from '../models/curriculum';

export class CurriculumProvider implements vscode.TreeDataProvider<CurriculumItem | SubCurriculumItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<CurriculumItem | undefined | null | void> = new vscode.EventEmitter<CurriculumItem | undefined | null | void>();
    private items: CurriculumItem[] = [];
    readonly onDidChangeTreeData: vscode.Event<CurriculumItem | undefined | null | void> = this._onDidChangeTreeData.event;

    getTreeItem(element: CurriculumItem | SubCurriculumItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: CurriculumItem): Thenable<(CurriculumItem | SubCurriculumItem)[]> {
        if (element) {
            const sortedItems = [...element.subItems].sort((a, b) => b.progress - a.progress);
            return Promise.resolve(
                sortedItems.map(item => new SubCurriculumItem(
                    item.label,
                    item.progress,
                    element.type
                ))
            );
        }

        const items = [
            new CurriculumItem(
                '백엔드 개발',
                'backend',
                vscode.TreeItemCollapsibleState.Expanded,
                30,
                [
                    { label: '기본 Node.js', progress: 60 },
                    { label: 'Express 프레임워크', progress: 40 },
                    { label: '데이터베이스 설계', progress: 20 }
                ]
            ),
            new CurriculumItem(
                '프론트엔드 개발',
                'frontend',
                vscode.TreeItemCollapsibleState.Collapsed,
                45,
                [
                    { label: 'HTML & CSS', progress: 80 },
                    { label: '자바스크립트 기초', progress: 50 },
                    { label: 'React 프레임워크', progress: 30 }
                ]
            ),
            new CurriculumItem(
                '풀스택 개발',
                'fullstack',
                vscode.TreeItemCollapsibleState.Collapsed,
                15,
                [
                    { label: '풀스택 아키텍처', progress: 40 },
                    { label: 'API 통합', progress: 20 },
                    { label: '배포', progress: 0 }
                ]
            ),
        ];
        return Promise.resolve(items.sort((a, b) => b.progress - a.progress));
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    // 다른 확장에서 호출할 수 있는 메서드들
    getCurrentProgress() {
        return this.items.map(item => ({
            type: item.type,
            progress: item.progress
        }));
    }

    updateProgress(type: string, progress: number) {
        const item = this.items.find(i => i.type === type);
        if (item) {
            item.setProgress(progress);
            this.refresh();
        }
    }

    // 다른 확장의 이벤트 구독
    subscribeToExternalEvents() {
        // 다른 확장의 이벤트 리스너 등록
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('other-extension.progress')) {
                this.syncWithExternalProgress();
            }
        });
    }

    private syncWithExternalProgress() {
        const config = vscode.workspace.getConfiguration('other-extension');
        const externalProgress = config.get('progress');
        if (externalProgress) {
            // 외부 진행률 데이터 동기화
            this.updateFromExternalData(externalProgress);
        }
    }

    private updateFromExternalData(externalProgress: any) {
        // Update items based on external progress data
        if (Array.isArray(externalProgress)) {
            externalProgress.forEach(progress => {
                if (progress.type && typeof progress.progress === 'number') {
                    this.updateProgress(progress.type, progress.progress);
                }
            });
        }
    }
}
