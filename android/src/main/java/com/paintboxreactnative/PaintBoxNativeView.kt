package com.paintboxreactnative

import android.content.Context
import android.widget.FrameLayout
import com.kotlin.native_drawing_plugin.PaintBoxView

class PaintBoxNativeView(context: Context): FrameLayout(context) {
  val view: PaintBoxView = PaintBoxView(context)

  init {
    this.addView(view)
  }
}
