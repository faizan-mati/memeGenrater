import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export default async function Home() {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const data = await res.json();
  const memes = data.data.memes;

  return (
    <div className="container">
      <h1 className="text-center p-5">POPULAR MEMES</h1>
      <div className="row">
        {memes.map((meme, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Link href={`/meme/${meme.id}`} passHref>
              <div className="card h-100">
                <img
                  src={meme.url}
                  className="card-img-top img-fluid"
                  style={{ height: "300px", objectFit: "fit" }}
                  alt={meme.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{meme.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>

  );
}
