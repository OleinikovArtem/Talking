export default async function ChannelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div>
      <h1>Channel Page</h1>
      <p>Channel ID: {id}</p>
    </div>
  );
}
