// app/api/hello/route.js

export async function GET() {
    return new Response(JSON.stringify({ message: 'Hola desde el servidor!' }), {
      status: 200,
    });
  }
  