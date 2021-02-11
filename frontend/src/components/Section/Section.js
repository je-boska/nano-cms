import React from 'react'
import './Section.css'
import ReactMarkdown from 'react-markdown'

const Layout = ({ post, layout }) => {
  return (
    <>
      {post.sections.map(section => {
        const css = `
          .${section.sectionId} p,
          .${section.sectionId} a:visited {
            color: ${section.color};
          }
        `
        return (
          <section
            key={section.sectionId}
            className={`section ${layout}`}
            style={{
              backgroundImage: section.image && `url(${section.image})`,
              backgroundColor: section.backgroundColor,
              textAlign: section.centered ? 'center' : 'left',
            }}
          >
            <style>{css}</style>
            {section.title || section.text ? (
              <div
                className={`centered-text ${section.sectionId} ${
                  section.centered ? 'centered' : null
                }`}
              >
                {section.title ? (
                  <h1
                    style={{ fontFamily: section.font, color: section.color }}
                  >
                    {section.title}
                  </h1>
                ) : null}
                {section.text ? (
                  <div>
                    <ReactMarkdown children={section.text} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        )
      })}
    </>
  )
}

export default Layout
