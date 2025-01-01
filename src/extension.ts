import * as vscode from 'vscode';
import { CurriculumProvider } from './providers/curriculumProvider';
import { TutorialManager } from './managers/tutorialManager';
import { getTutorialSteps } from './utils/tutorialSteps';

export function activate(context: vscode.ExtensionContext) {
    const curriculumProvider = new CurriculumProvider();
    const tutorialManager = new TutorialManager(context);

    vscode.window.registerTreeDataProvider('curriculumView', curriculumProvider);

    let disposableSelectPath = vscode.commands.registerCommand('edu-curriculum.selectPath', (type: string) => {
        const steps = getTutorialSteps(type);
        tutorialManager.startTutorial(steps);
    });

    context.subscriptions.push(disposableSelectPath);

    // 코어 기능 접근 예시
    const activeEditor = vscode.window.activeTextEditor;
    const workbenchConfig = vscode.workspace.getConfiguration('workbench');
    const terminalInstance = vscode.window.terminals[0];

    // 코어 명령어 실행
    vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');
    vscode.commands.executeCommand('workbench.action.togglePanel');

    // API 노출
    return {
        // 다른 확장에서 호출할 수 있는 메서드 제공
        getCurrentProgress: () => {
            return curriculumProvider.getCurrentProgress();
        },
        updateProgress: (type: string, progress: number) => {
            curriculumProvider.updateProgress(type, progress);
        }
    };
}

export function deactivate() {}
