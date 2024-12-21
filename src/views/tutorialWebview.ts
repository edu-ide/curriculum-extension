export function getStyledHtmlForWebview(step: string, currentStep: number, totalSteps: number): string {
    return `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                padding: 10px;
                font-family: var(--vscode-font-family);
                color: var(--vscode-editor-foreground);
                background-color: var(--vscode-editor-background);
                line-height: 1.4;
                font-size: 12px;
                overflow-x: hidden;
            }
            .tutorial-content {
                display: flex;
                flex-direction: column;
                height: calc(100vh - 20px);
            }
            h2 {
                font-size: 14px;
                margin: 4px 0;
            }
            .step-indicator {
                font-size: 11px;
                margin-bottom: 8px;
            }
            .nav-buttons {
                margin-top: auto;
                padding: 8px 0;
                border-top: 1px solid var(--vscode-textSeparator-foreground);
            }
            button {
                padding: 4px 12px;
                font-size: 11px;
                background-color: var(--vscode-button-background);
                color: var(--vscode-button-foreground);
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .tutorial-step {
                flex: 1;
                overflow-y: auto;
                padding-right: 8px;
            }
            .progress-bar {
                width: 100%;
                height: 3px;
                background-color: var(--vscode-progressBar-background);
                margin: 8px 0;
            }
            .progress-value {
                height: 100%;
                background-color: var(--vscode-progressBar-foreground);
                transition: width 0.3s ease;
            }
        </style>
    </head>
    <body>
        <div class="tutorial-content">
            <div class="step-indicator">
                진행 단계: ${currentStep + 1} / ${totalSteps}
            </div>
            <div class="progress-bar">
                <div class="progress-value" style="width: ${((currentStep + 1) / totalSteps) * 100}%"></div>
            </div>
            <div class="tutorial-step">
                <h2>${step}</h2>
                <div class="step-content">
                    ${formatStepContent(step)}
                </div>
            </div>
            <div class="nav-buttons">
                <button onclick="previousStep()" ${currentStep === 0 ? 'disabled' : ''}>
                    ◀ 이전
                </button>
                <button onclick="nextStep()" ${currentStep === totalSteps - 1 ? 'disabled' : ''}>
                    다음 ▶
                </button>
            </div>
        </div>
        <script>
            const vscode = acquireVsCodeApi();
            
            function previousStep() {
                vscode.postMessage({ command: 'previousStep' });
            }
            
            function nextStep() {
                vscode.postMessage({ command: 'nextStep' });
            }
        </script>
    </body>
    </html>`;
}

export function formatStepContent(step: string): string {
    if (step.startsWith('-')) {
        return `<div style="padding-left: 20px; position: relative;">
                    <span style="position: absolute; left: 0;">•</span>
                    ${step.substring(1)}
                </div>`;
    } else if (step.match(/^\d+\./)) {
        return `<div style="font-weight: bold; color: var(--vscode-symbolIcon-classForeground);">
                    ${step}
                </div>`;
    }
    return `<div>${step}</div>`;
}
