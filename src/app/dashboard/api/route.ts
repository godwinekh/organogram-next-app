export async function GET() {
  const res = await fetch("qt.organogram.app/questions", {
    method: "GET",
    headers: {
      "Token": process.env.DATA_API_KEY!,
    },
  });
  const data = await res.json();

  return Response.json({ data });
}

export async function POST() {
  const res = await fetch("qt.organogram.app/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Token": process.env.DATA_API_KEY!,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });

  const data = await res.json();

  return Response.json(data);
}

export async function PUT() {
  const res = await fetch("qt.organogram.app/questions/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Token": process.env.DATA_API_KEY!,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });

  const data = await res.json();

  return Response.json(data);
}

export async function DELETE() {
  const res = await fetch("qt.organogram.app/questions", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Token": process.env.DATA_API_KEY!,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });

  const data = await res.json();

  return Response.json(data);
}
