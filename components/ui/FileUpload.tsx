'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconUpload } from '@tabler/icons-react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
}

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

type FileUploadProps = {
  onChange?: (files: File[]) => void
}

type UploadItem = {
  file: File
  previewUrl?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
  const [items, setItems] = useState<UploadItem[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl)
      })
    }
  }, [items])

  const makeUploadItems = (files: File[]): UploadItem[] => {
    return files.map((file) => {
      const isImage = file.type.startsWith('image/')
      const previewUrl = isImage ? URL.createObjectURL(file) : undefined
      return { file, previewUrl }
    })
  }

  const handleFileChange = (newFiles: File[]) => {
    if (!newFiles.length) return

    const newItems = makeUploadItems(newFiles)

    setItems((prev) => [...prev, ...newItems])
    onChange?.(newFiles)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error)
    },
  })

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="group/file relative block w-full cursor-pointer overflow-hidden rounded-[20px] border border-white/10 bg-black/30 p-10"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <p className="font-sans text-base font-semibold text-text-primary">
            Upload full-body image
          </p>
          <p className="mt-2 font-sans text-sm font-normal text-text-quaternary">
            Drag and drop your image here, or click to browse
          </p>

          <div className="relative mx-auto mt-8 w-full max-w-xl">
            {items.length > 0 &&
              items.map((item, idx) => (
                <motion.div
                  key={item.file.name + idx}
                  layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                  className={cn(
                    'relative z-40 mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-[16px] bg-black/60 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)]',
                    'border border-white/10 backdrop-blur-lg'
                  )}
                >
                  <div className="flex w-full items-center gap-4">
                    {item.previewUrl && (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[12px] border border-white/10 bg-black/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.previewUrl}
                          alt={item.file.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col gap-1">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="max-w-xs truncate text-sm text-text-primary"
                      >
                        {item.file.name}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-md bg-white/5 px-2 py-1 text-xs text-text-secondary"
                      >
                        {(item.file.size / (1024 * 1024)).toFixed(2)} MB ·{' '}
                        {item.file.type || 'Unknown type'}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-xs text-text-quaternary"
                      >
                        Modified{' '}
                        {new Date(item.file.lastModified).toLocaleDateString()}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}

            {!items.length && (
              <>
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    'relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white/5 shadow-[0_10px_50px_rgba(0,0,0,0.25)]',
                    'group-hover/file:shadow-[0_16px_60px_rgba(0,0,0,0.35)]'
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center text-xs text-text-secondary"
                    >
                      Drop it
                      <IconUpload className="mt-1 h-4 w-4 text-text-secondary" />
                    </motion.p>
                  ) : (
                    <IconUpload className="h-5 w-5 text-text-secondary" />
                  )}
                </motion.div>

                <motion.div
                  variants={secondaryVariant}
                  className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-[#7E8BFF]/70 bg-transparent opacity-0"
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function GridPattern() {
  const columns = 41
  const rows = 11
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-px gap-y-px bg-[#050505]">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col
          return (
            <div
              key={`${col}-${row}`}
              className={cn(
                'flex h-10 w-10 shrink-0 rounded-[2px]',
                index % 2 === 0
                  ? 'bg-[#050505]'
                  : 'bg-[#050505] shadow-[0_0_1px_3px_rgba(255,255,255,0.04)_inset]'
              )}
            />
          )
        })
      )}
    </div>
  )
}

export default FileUpload


