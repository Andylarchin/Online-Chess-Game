import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { CaretUpOutlined } from '@ant-design/icons';
import {
  PlayCircleOutlined,
  BookOutlined,
  EyeOutlined,
  AlignCenterOutlined,
  UserOutlined,
  MoreOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  RedditOutlined,
  TwitchOutlined,
  LeftOutlined,
  SearchOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='mainContainer'>
        <div className='headerContainer'>
          <div className='userText'>
            <img
              className='plainLogo'
              src='data:image/png;base64,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'
            ></img>
            <p className='userInformation'>Andylarchin</p>
            <p className='userInformation'>
              Rating : 901{' '}
              <CaretUpOutlined
                style={{ marginLeft: '5px', color: '#5ced73' }}
              />
            </p>
          </div>

          <div className='game-buttons-container'>
            <button
              className='playButton'
              onClick={() => {
                navigate('/main');
              }}
            >
              Play <PlayCircleOutlined />
            </button>
            <ul className='sideBar'>
              <li>
                <IoExtensionPuzzleOutline
                  style={{ fontSize: '25px', marginLeft: '10px' }}
                />
                <p>Puzzles</p>
              </li>
              <li>
                <BookOutlined />
                <p>Learn</p>
              </li>
              <li>
                <EyeOutlined />
                <p>Watch</p>
              </li>
              <li>
                <AlignCenterOutlined />
                <p>News</p>
              </li>
              <li>
                <UserOutlined />
                <p>Social</p>
              </li>
              <li>
                <MoreOutlined />
                <p>More</p>
              </li>
            </ul>
          </div>
          <ul className='socialsIcons'>
            <li>
              <FacebookOutlined />
            </li>
            <li>
              <TwitterOutlined />
            </li>
            <li>
              <InstagramOutlined />
            </li>
            <li>
              <RedditOutlined />
            </li>
            <li>
              <TwitchOutlined />
            </li>
          </ul>
          <p className='lastLine'>
            <LeftOutlined style={{ marginRight: '20px', fontSize: '20px' }} />
            Collapse
          </p>
        </div>
        <div className='imagePanel'>
          <img src='public\images\14609.e49d2fe3.png' />
          <div className='statsPanel'>
            <div className='statsHeader'>
              <ul>
                <li>Stats and games</li>
                <li>Explore</li>
                <li>Tournaments</li>
                <li>Friends</li>
              </ul>
              <div id='searchBar' className='relative flex'>
                <input
                  type='search'
                  className='relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary'
                  aria-label='Search'
                  id='exampleFormControlInput2'
                  aria-describedby='button-addon2'
                ></input>
              </div>
            </div>
            <div className='imageStats'>
              <div className='statsBlock'>
                <div className='topStats'>
                  <p>Ranking Speed</p>
                  <p>603</p>
                  <DownOutlined />
                  <MoreOutlined />
                </div>
                <img
                  src='src\components\Header\image1.png'
                  style={{ width: '100%', height: '40%' }}
                />
                <div className='gameStats'>
                  <div className='statsDiv'>
                    <p>Highest</p>
                    <p>611</p>
                  </div>
                  <div className='statsDiv'>
                    <p>Games</p>
                    <p>289</p>
                  </div>
                  <div className='statsDiv'>
                    <p>W/D/L</p>
                    <p>177/20/34</p>
                  </div>
                </div>
              </div>
              <div className='statsBlock'>
                <div className='topStats'>
                  <p>Ranking Speed</p>
                  <p>603</p>
                  <DownOutlined />
                  <MoreOutlined />
                </div>
                <img
                  src='src\components\Header\image.png'
                  style={{ width: '100%', height: '40%' }}
                />
                <div className='gameStats'>
                  <ul>
                    <li>Won</li>
                    <li>Drawn</li>
                    <li>Lost</li>
                  </ul>
                </div>
              </div>
              <div className='statsBlock'>
                <div className='topStats'>
                  <p>Ranking Speed</p>
                  <p>603</p>
                  <DownOutlined />
                  <MoreOutlined />
                </div>
                <img
                  src='src\components\Header\image1.png'
                  style={{ width: '100%', height: '40%' }}
                />
                <div className='gameStats'>
                  <div className='statsDiv'>
                    <p>Highest</p>
                    <p>611</p>
                  </div>
                  <div className='statsDiv'>
                    <p>Games</p>
                    <p>289</p>
                  </div>
                  <div className='statsDiv'>
                    <p>W/D/L</p>
                    <p>177/20/34</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
