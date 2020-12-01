import React from 'react'
import './Section.css'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const Layout = ({ post, layout }) => {
  return (
    <>
      {post.sections.map(section => (
        <section
          key={section.sectionId}
          className={`section ${layout}`}
          style={{
            backgroundImage: section.image && `url(${section.image})`,
            backgroundColor: section.backgroundColor,
          }}
        >
          {section.title || section.text ? (
            <div className='centered-text'>
              {section.title ? (
                <h1 style={{ fontFamily: section.font, color: section.color }}>
                  {section.title}
                </h1>
              ) : null}
              {section.text ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: md.render(section.text),
                  }}
                  style={{ color: section.color }}
                ></div>
              ) : null}
            </div>
          ) : null}
        </section>
      ))}
    </>
  )
}

export default Layout
