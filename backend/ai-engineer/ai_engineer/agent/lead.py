from ai_engineer.prompts.template import LEAD_PROMPT_TEMPLATE
from ai_engineer.context.reader import get_project_context
from ai_engineer.tools.llm import call_llm

def run_lead_mode(task: str):
    print(f"AI Engineer planning task: {task}")
    context = get_project_context()
    full_prompt = LEAD_PROMPT_TEMPLATE.format(prompt=task, context=context)

    steps = call_llm(full_prompt)
    
    print("📋 Rencana Teknis:")
    for i, step in enumerate(steps, 1):
        print(f"{i}. {step}")
