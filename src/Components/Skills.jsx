import Badge from './Badge'

const Skills = () => {
  return (

    <div className='container mx-auto py-2 px-2 mb-10' id="skills">
      <h2 className="text-4xl font-bold text-blue-500 mb-10">My Skills</h2>
      <div>
        <p className={`text-lg mt-5 text-[20px] mb-2 text-white `}>Programming Language</p><hr />
        <div className='flex flex-wrap gap-x-2'>
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg"} name={"C language"} />

          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg"} name={"C++ language"} />

          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg"} name={"C# language"} />
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"} name={"Javascript"} />
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg"} name={"PHP"} />
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"} name={"Java"} />
          {/* <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"} name={"Python"} /> */}
        </div>
      </div>

      <div>
        <p className={`text-lg mt-5 text-[20px] mb-2 text-white`}>Frontend Development</p><hr />
        <div className='flex flex-wrap gap-x-2'>
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"} name={"HTML"} />
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg"} name={"CSS"} />
          <Badge imgUrl={"https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"} name={"Tailwind"} />
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg"} name={"Bootstrap"} />
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"} name={"React js"} />
        </div>
      </div>

      <div>
        <p className={`text-lg mt-5 text-[20px] mb-2 text-white`}>Backend Development</p><hr />
        <div className='flex flex-wrap gap-x-2'>
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg"} name={"PHP"} />
          {/* <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg"} name={"Node js"} /> */}
          {/* <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg"} name={"Express"} /> */}
        </div>
      </div>

      <div>
        <p className={`text-lg mt-5 text-[20px] mb-2 text-white`}>Database</p><hr />
        <div className='flex flex-wrap gap-x-2'>
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg"} name={"My sql"} />
          <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg"} name={"Oracale"} />
          {/* <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg"} name={"Mongo DB"} /> */}
          {/* <Badge imgUrl={"https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg"} name={"PostgreSql"} /> */}
        </div>
      </div>

      <div>
        <p className={`text-lg mt-5 text-[20px] mb-2 text-white`}>Game Engines</p><hr />
        <div className='flex flex-wrap gap-x-2'>
          <Badge imgUrl={"https://www.vectorlogo.zone/logos/unity3d/unity3d-icon.svg"} name={"Unity"} />
          {/* <Badge imgUrl={"https://raw.githubusercontent.com/kenangundogan/fontisto/036b7eca71aab1bef8e6a0518f7329f13ed62f6b/icons/svg/brand/unreal-engine.svg"} name={"Unreal"} /> */}
        </div>
      </div>

    </div>
  );
};

export default Skills;
