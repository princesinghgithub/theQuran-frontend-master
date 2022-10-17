import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent implements OnInit {
  modalRef?: BsModalRef;
  currentUrl = window.location.href;
  @Input() customStyle: any = { width: '40px', height: '35px' };
  shareBtns = [
    {
      id: 1,
      name: 'facebook',
      color: '#1877f2',
      text: 'Facebook',
    },
    {
      id: 2,
      name: 'twitter',
      color: '#1da1f2',
      text: 'Tweet',
    },
    {
      id: 3,
      name: 'linkedin',
      color: '#0077b5',
      text: 'LinkedIn',
    },
    {
      id: 4,
      name: 'whatsapp',
      color: '#25d366',
      text: 'WhatsApp',
    },
    {
      id: 5,
      name: 'messenger',
      color: '#0084ff',
      text: 'Messenger',
    },
    {
      id: 6,
      name: 'telegram',
      color: '#0088cc',
      text: 'Telegram',
    },
    {
      id: 7,
      name: 'email',
      color: '#f5f5f5',
      text: 'Email',
    },
    {
      id: 8,
      name: 'sms',
      color: '#f5f5f5',
      text: 'SMS',
    },
    {
      id: 9,
      name: 'copy',
      color: '#f5f5f5',
      text: 'Copy Link',
    },
    {
      id: 10,
      name: 'print',
      color: '#f5f5f5',
      text: 'Print',
    },
  ];

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openModal(sidenav: TemplateRef<any>) {
    this.modalRef = this.modalService.show(sidenav, { class: 'modal-md' });
  }
}
