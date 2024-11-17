import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

interface Comment {
  rating: number;
  text: string;
}

@Component({
  selector: 'app-comments-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>{{data.marker.category}}</h2>
    <mat-dialog-content>
      <p class="description">{{data.marker.description}}</p>

      <div class="rating-section">
        <div class="stars rating-stars">
          <span *ngFor="let star of [1,2,3,4,5]" 
                class="star"
                [class.active]="star <= newRating"
                (click)="setRating(star)">
            ★
          </span>
        </div>
      </div>

      <mat-form-field class="comment-input">
        <textarea matInput
                  [(ngModel)]="newComment"
                  placeholder="Escribe tu comentario"
                  maxlength="250"
                  rows="3"></textarea>
        <mat-hint align="end">{{newComment.length}}/250</mat-hint>
      </mat-form-field>

      <div class="comments-list">
        <div class="comment-item" *ngFor="let comment of comments">
          <div class="stars">
            <span *ngFor="let star of [1,2,3,4,5]" 
                  class="star"
                  [class.active]="star <= comment.rating">
              ★
            </span>
          </div>
          <p class="comment-text">{{comment.text}}</p>
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cancelar</button>
      <button mat-button color="warn" (click)="onDelete()">Eliminar</button>
      <button mat-raised-button color="primary" (click)="onAccept()">Aceptar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .description {
      margin-bottom: 20px;
      color: #666;
    }

    .rating-section {
      margin: 20px 0;
    }

    .stars {
      display: flex;
      gap: 5px;
    }

    .rating-stars .star {
      font-size: 48px;  /* Doble tamaño para las estrellas de calificación */
    }

    .star {
      font-size: 24px;
      cursor: pointer;
      color: #e0e0e0;
      transition: color 0.2s;
    }

    .star.active {
      color: #ffd700;
    }

    .comment-input {
      width: 100%;
      margin: 20px 0;
    }

    .comments-list {
      margin-top: 30px;
    }

    .comment-item {
      margin: 15px 0;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }

    .comment-text {
      margin: 5px 0;
      color: #666;
    }
  `]
})
export class CommentsDialogComponent {
  newRating: number = 0;
  newComment: string = '';
  
  comments: Comment[] = [
    { rating: Math.floor(Math.random() * 5) + 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { rating: Math.floor(Math.random() * 5) + 1, text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { rating: Math.floor(Math.random() * 5) + 1, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.' },
    { rating: Math.floor(Math.random() * 5) + 1, text: 'Duis aute irure dolor in reprehenderit in voluptate velit.' },
    { rating: Math.floor(Math.random() * 5) + 1, text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa.' }
  ];

  constructor(
    public dialogRef: MatDialogRef<CommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  setRating(rating: number) {
    this.newRating = rating;
  }

  onDelete() {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar esta marca?');
    
    if (confirmar && this.data.onDelete) {
      this.data.onDelete();
    }
  }

  onAccept() {
    if (this.newRating && this.newComment.trim()) {
      // Aquí puedes agregar la lógica para guardar el comentario
      this.comments.unshift({
        rating: this.newRating,
        text: this.newComment
      });
      this.dialogRef.close();
    }
  }
}