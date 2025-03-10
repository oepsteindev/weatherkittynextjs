export default function Header() {
  const defaultLogo = 'https://static.scientificamerican.com/sciam/cache/file/9CAE9C60-8BC5-4CA3-95C180EFACDD99FD_source.jpg?w=900';

  return (
    <div>
    <img src={defaultLogo} alt="logo" height="300" width="300" className="mb-4"/>
    <header className="text-center py-4 text-4xl font-bold">
      <a href="/" className="hover:underline">
        WeatherKitty
      </a>
    </header></div>
  );
}
