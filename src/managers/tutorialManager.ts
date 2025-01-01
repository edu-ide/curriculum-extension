import * as vscode from 'vscode';
import { getStyledHtmlForWebview } from '../views/tutorialWebview';

export class TutorialManager {
    private currentStep: number = 0;
    private steps: string[] = [];
    private panel: vscode.WebviewPanel | undefined;

    constructor(private context: vscode.ExtensionContext) {}

    startTutorial(steps: string[]) {
        if (steps && steps.length > 0) {
            this.steps = steps;
            this.currentStep = 0;
            this.showCurrentStep();
        } else {
            vscode.window.showErrorMessage('튜토리얼 내용을 찾을 수 없습니다.');
        }
    }

    private nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showCurrentStep();
        }
    }

    private previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showCurrentStep();
        }
    }

    private showCurrentStep() {
        if (!this.panel) {
            this.panel = vscode.window.createWebviewPanel(
                'tutorial',
                '튜토리얼',
                {
                    viewColumn: vscode.ViewColumn.Three,  // 오른쪽 사이드에 표시
                    preserveFocus: true
                },
                {
                    enableScripts: true,
                    retainContextWhenHidden: true
                }
            );

            // 패널이 생성될 때 크기 조절
            vscode.commands.executeCommand('workbench.action.setEditorLayoutThreeColumns');
            setTimeout(() => {
                vscode.commands.executeCommand('workbench.action.resizeEditorGroups', {
                    "groups": [
                        { "size": 0.6 },  // 메인 에디터
                        { "size": 0.2 },  // 중간 여백
                        { "size": 0.2 }   // 튜토리얼 패널
                    ]
                });
            }, 100);

            // 메시지 핸들러 등록
            this.panel.webview.onDidReceiveMessage(
                message => {
                    switch (message.command) {
                        case 'nextStep':
                            this.nextStep();
                            break;
                        case 'previousStep':
                            this.previousStep();
                            break;
                    }
                },
                undefined,
                this.context.subscriptions
            );

            // 패널이 닫힐 때 레이아웃 복구
            this.panel.onDidDispose(() => {
                this.panel = undefined;
                vscode.commands.executeCommand('workbench.action.setEditorLayoutSingle');
            }, null, this.context.subscriptions);
        }

        // 패널 내용 업데이트
        this.panel.webview.html = getStyledHtmlForWebview(
            this.steps[this.currentStep],
            this.currentStep,
            this.steps.length
        );
    }

    private async customizeWorkbench() {
        const config = vscode.workspace.getConfiguration();
        
        // 워크벤치 설정 변경
        await config.update('workbench.colorTheme', 'Default Dark+', true);
        await config.update('workbench.statusBar.visible', false, true);
        await config.update('workbench.activityBar.location', 'hidden', true);
    }
}
