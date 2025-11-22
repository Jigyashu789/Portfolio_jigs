export const projects = [
    {
        id: "chat-with-pdf",
        title: "Chat With PDF (RAG)",
        description: "A RAG-based application allowing users to chat with their PDF documents.",
        tech: ["Python", "LangChain", "FAISS", "Flan-T5"],
        github: "https://github.com/Jigyashu789/Chat-with-Pdf",
        details: "Implements Retrieval-Augmented Generation (RAG) to query PDF content. Uses FAISS for vector storage and Flan-T5 for generation.",
    },
    {
        id: "quote-qa",
        title: "Quote Q/A (LLM)",
        description: "LLM fine-tuning project for question answering based on quotes.",
        tech: ["LLM", "LoRA", "Fine-tuning"],
        github: "https://github.com/Jigyashu789/Quote-Q-and-A",
        details: "Fine-tuned a Large Language Model using LoRA (Low-Rank Adaptation) on a dataset of quotes to answer questions contextually.",
    },
    {
        id: "ai-saas",
        title: "Capstone AI SaaS",
        description: "A multi-agent AI SaaS platform with RBAC and Next.js integration.",
        tech: ["Next.js", "Multi-agent", "RBAC", "LLM"],
        github: "https://github.com/Jigyashu789/Capstone-project-Ai-Saas",
        details: "Comprehensive SaaS platform featuring multiple AI agents, Role-Based Access Control, and scalable architecture.",
    },
]

export const achievements = [
    {
        title: "State-level Winner",
        event: "DBPH Hackathon (MNIT Bhopal)",
        description: "Won the state-level hackathon for innovative solution.",
        date: "2023",
    },
    {
        title: "National Round Qualifier",
        event: "IIT BHU",
        description: "Qualified for the national round of the coding competition.",
        date: "2023",
    },
    {
        title: "Central Zone Winner",
        event: "IIT Indore (G20 Debate)",
        description: "Winner of the G20 Debate competition, Central Zone.",
        date: "2023",
    },
    {
        title: "Finalist",
        event: "IIT Hyderabad",
        description: "Finalist in the tech innovation challenge.",
        date: "2024",
    },
]

export const skills = {
    languages: ["Python", "TypeScript", "JavaScript", "SQL", "C++"],
    ai_ml: ["Generative AI", "RAG", "LLMs", "LangChain", "PyTorch", "TensorFlow"],
    cloud_devops: ["AWS", "Docker", "Git", "CI/CD"],
    web: ["Next.js", "React", "Tailwind CSS", "Node.js", "FastAPI"],
    tools: ["VSCode", "Postman", "Colab", "Streamlit", "Jupyter"],
}
